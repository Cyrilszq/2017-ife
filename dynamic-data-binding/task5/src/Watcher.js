let $uid = 0
class Watcher {
    constructor(node, scope, exp, callback) {
        this.uid = $uid++
        Dep.target = this
        // 这里经过了eval之后相当于访问了对象上的属性，比如exp = `年龄`：user.age ,eval之后就会触发user.age的getter，在此时跟新了依赖
        let code = `with (this){
                        exp = eval(exp)
                    }
                    return exp     
                   `
        let textContent
        try {
            textContent = new Function('exp', code).call(scope, exp)
        } catch (e) {
            console.error(e.message)
        }
        node.textContent = textContent
        Dep.target = null
        this.cb = callback
    }

    update(newVal) {
        this.cb && this.cb(newVal)
    }
}