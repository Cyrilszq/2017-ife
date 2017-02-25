// 整个的入口，仅仅初始化了Observer和Compiler
class Vue {
    constructor(options) {
        this.data = options.data
        new Observer(this.data)
        new Compiler(options)
    }
}