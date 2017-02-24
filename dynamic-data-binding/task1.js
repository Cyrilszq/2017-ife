class Observer {
    constructor(options) {
        this.data = options
        this.convert(this.data)
    }

    // 遍历对象属性，依次调用defineReactive，为其添加get,set
    convert(obj) {
        let keys = Object.keys(obj)
        for (var i = 0; i < keys.length; i++) {
            this.defineReactive(keys[i], obj[keys[i]])
        }
    }

    defineReactive(key, val) {
        Object.defineProperty(this.data, key, {
            enumerable: true,
            configurable: true,
            get() {
                console.log('你访问了' + key);
                return val
            },
            set(newVal) {
                console.log(`你设置了${key},新的值为${newVal}`);
                if (newVal === val) return;
                val = newVal
            }
        })
    }
}

let app1 = new Observer({
    name: 'youngwind',
    age: 25
});

let app2 = new Observer({
    university: 'bupt',
    major: 'computer'
});

// 要实现的结果如下：
app1.data.name // 你访问了 name
app1.data.age = 100;  // 你设置了 age，新的值为100
app2.data.university // 你访问了 university
app2.data.major = 'science'  // 你设置了 major，新的值为 science


