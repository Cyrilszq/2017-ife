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


