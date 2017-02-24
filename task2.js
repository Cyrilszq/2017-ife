class Observer {
    constructor(options) {
        this.data = options
        this.convert(this.data)
    }

    // 遍历对象属性，依次调用defineReactive，为其添加get,set;遍历时如果val仍为对象则递归创建Observer
    convert(obj) {
        let keys = Object.keys(obj)
        for (var i = 0; i < keys.length; i++) {
            let val = obj[keys[i]]
            if (Object.prototype.toString.call(val) === '[object Object]') {
                new Observer(val)
            }
            this.defineReactive(keys[i], val)
        }
    }

    defineReactive(key, val) {
        Object.defineProperty(this.data, key, {
            enumerable: true,
            configurable: true,
            get() {
                console.log('你访问了' + key)
                return val
            },
            set(newVal) {
                console.log(`你设置了${key},新的值为${newVal}`)
                if (newVal === val) return
                val = newVal
            }
        })
    }
}
