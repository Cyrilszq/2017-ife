/**
 * 整个实现参考https://github.com/qieguo2016/Vueuv/blob/master/README.md
 */
class Vue {
    constructor(options) {
        this.$el = options.el
        this.data = options.data || {}
        new Compiler({el: this.$el, data: this.data})
    }
}

// 方便以后扩展，将模板编译单独作为一个类
class Compiler {
    constructor(options) {
        this.$el = options.el && document.querySelector(options.el)
        this.data = options.data
        if (this.$el) {
            // 将实际DOM插入到新建的fragment中
            this.$fragment = this.nodeToFragment(this.$el);
            // 处理模板
            this.compile(this.$fragment);
            // 将处理好的模板插入到实际DOM中
            this.$el.appendChild(this.$fragment);
        }
    }

    nodeToFragment(node) {
        let fragment = document.createDocumentFragment(), child;
        while (child = node.firstChild) {
            if (this.isIgnorable(child)) {     // delete '\n'
                node.removeChild(child);
            } else {
                fragment.appendChild(child);
            }
        }
        return fragment;
    }

    isIgnorable(node) {
        let regIgnorable = /^[\t\n\r]+/;
        return (node.nodeType == 8) || ((node.nodeType == 3) && (regIgnorable.test(node.textContent)));
    }

    compile(node) {
        let self = this
        Array.from(node.childNodes).forEach((child) => {
            if (child.nodeType === 1) {
                self.compileElementNode(child)
            }
            if (child.nodeType === 3) {
                self.compileTextNode(child)
            }
        })
    }

    // with+eval获取模板中变量的具体值
    compileTextNode(node) {
        let text = node.textContent.trim()
        let exp = parseTextExp(text)
        let code = `with (this.data){
                        exp = eval(exp)
                    }
                    return exp     
                   `
        let textContent
        try {
            textContent = new Function('exp', code).call(this, exp)
        } catch (e) {
            console.error(e.message)
        }

        node.textContent = textContent || text
    }

    compileElementNode(node) {
        this.compile(node)
    }

}

function parseTextExp(text) {
    let regText = /\{\{(.+?)\}\}/g;
    let pieces = text.split(regText);
    let matches = text.match(regText);
    // 文本节点转化为常量和变量的组合表达式，PS：表达式中的空格不管，其他空格要保留
    // 'a {{b+"text"}} c {{d+Math.PI}}' => '"a " + b + "text" + " c" + d + Math.PI'
    let tokens = [];
    pieces.forEach(function (piece) {
        if (matches && matches.indexOf('{{' + piece + '}}') > -1) {    // 注意排除无{{}}的情况
            tokens.push(piece);
        } else if (piece) {
            tokens.push('`' + piece + '`');
        }
    });
    return tokens.join('+');
}

let app = new Vue({
    el: '#app',
    data: {
        user: {
            name: 'youngwind',
            age: 25
        }
    }
});