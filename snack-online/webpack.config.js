const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = (options = {}) => {
    return {
        entry: {
            main: './src/index.js',
        },
        output: {
            publicPath: '/',
            filename: options.dev ? '[name].js' : '[chunkhash].[name].js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [{
                        loader: 'babel-loader',
                        // babel配置
                        options: {
                            presets: [['es2015', {modules: false}]],
                            plugins: [
                                'transform-async-to-generator',
                                'transform-regenerator',
                                'transform-runtime'
                            ]
                        }
                    }]
                },
                {
                    test: /\.html$/,
                    use: 'html-loader'
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        use: 'css-loader'
                    })

                },

                {
                    test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 10000
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            // 分离CSS文件
            new ExtractTextPlugin('styles.css'),
            new HtmlWebpackPlugin({
                template: './index.html'
            }),
            // split vendor js into its own file
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: function (module, count) {
                    // any required modules inside node_modules are extracted to vendor
                    return (
                        module.resource &&
                        /\.js$/.test(module.resource) &&
                        module.resource.indexOf(
                            path.join(__dirname, './node_modules')
                        ) === 0
                    )
                }
            }),
            // extract webpack runtime and module manifest to its own file in order to
            // prevent vendor hash from being updated whenever app bundle is updated
            new webpack.optimize.CommonsChunkPlugin({
                name: 'manifest',
                chunks: ['vendor']
            })
        ],
        devServer: {
            // 配置本地监听端口
            port: 3000,
            historyApiFallback: true,
            //　在这里配置反向代理
            // proxy: {
            //     '/api': {
            //         target: 'http://localhost:3001',
            //         secure: false,
            //         changeOrigin: true,
            //     }
            // }
        },
        performance: {
            hints: options.dev ? false : 'warning'
        }
    }
};
