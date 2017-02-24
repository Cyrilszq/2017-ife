class Observer {
    constructor(data) {
        this.data = data
        this.observe(this.data)
        Object.keys(this.data).forEach(key => {
            new Watcher(this.data, key)
        })
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
                dep.notify(newVal)
            }
        })
    }

    $watch(key, cb) {
        new Watcher(this.data, key, cb)
    }
}
let $uid = 0
class Watcher {
    constructor(obj, key, callback) {
        this.uid = $uid++
        Dep.target = this

        if (typeof obj[key] === 'object') {
            Object.keys(obj[key]).forEach(i => {
                obj[key][i] //为了触发get，添加依赖
            })
        } else {
            obj[key]
        }
        Dep.target = null
        this.cb = callback
    }

    update(newVal) {
        this.cb && this.cb(newVal)
    }
}

class Dep {
    constructor() {
        this.subs = {}
    }

    addSub(target) {
        if (!this.subs[target.uid]) {  //防止重复添加
            this.subs[target.uid] = target;
        }
    }

    notify(newVal) {
        for (let uid in this.subs) {
            this.subs[uid].update(newVal);
        }
    }
}
Dep.target = null

let app2 = new Observer({
    name: {
        firstName: 'shaofeng',
        lastName: 'liang'
    },
    age: 25
});

app2.$watch('name', function (newName) {
    console.log('我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。')
});

app2.data.name.firstName = 'hahaha';
// 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。
app2.data.name.lastName = 'blablabla';
// 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。
