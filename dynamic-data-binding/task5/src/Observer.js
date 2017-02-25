/**
 * 为data中的所有属性添加getter,setter并在合适的时机收集依赖，执行回调
 */
class Observer {
    constructor(data) {
        this.data = data
        this.observe(this.data)
    }

    // 遍历对象属性，依次调用defineReactive，为其添加get,set
    observe(obj) {
        let self = this
        // 递归终止条件
        if (!obj || typeof obj !== 'object') {
            return;
        }
        Object.keys(obj).forEach(key => {
            self.defineReactive(obj, key, obj[key])
        })
    }

    defineReactive(obj, key, val) {
        let self = this
        let dep = new Dep()
        // 如果是一个“比较深”的对象，递归观察
        self.observe(val)
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                // get的时候在依赖中添加Watcher,其中Dep.target指的就是Watcher
                Dep.target && dep.addSub(Dep.target)
                console.log('你访问了' + key)
                return val
            },
            set(newVal) {
                console.log(`你设置了${key},新的值为${newVal}`)
                if (newVal === val) return
                val = newVal
                // 继续为新设置的值设置get,set
                self.observe(newVal)
                //　执行回调
                dep.notify(newVal)
            }
        })
    }
}