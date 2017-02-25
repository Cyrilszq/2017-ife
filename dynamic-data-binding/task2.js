/**
 * 学习的Vue的设计，因为抽离了Compiler部分，所以有些地方显得很奇怪，会有注释
 * 而且只是一个Demo展示，没有做模块划分，直接写在一起了
 */
class Observer {
    constructor(data) {
        this.data = data
        this.observe(this.data)
        //　为所有属性添加依赖，实际上这一步应该在模板编译中进行
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

    $watch(key, cb) {
        // 简单的再添加一个带有callback的watch，关于深层对象如何watch放在Watcher构造函数中进行
        new Watcher(this.data, key, cb)
    }
}

let $uid = 0
class Watcher {
    constructor(obj, key, callback) {
        this.uid = $uid++
        Dep.target = this
        // 这里其实应该用递归实现保证所有变量都被watch，我这里只是简单的保证第二级对象也被watch
        if (typeof obj[key] === 'object') {
            Object.keys(obj[key]).forEach(innerKey => {
                obj[key][innerKey] // 只是访问一下这个属性，为了触发get，添加依赖，结合Compiler的话这一步会在编译模板，求值时自动完成
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
