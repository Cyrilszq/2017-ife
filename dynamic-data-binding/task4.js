class Vue {
    constructor(options) {
        this.el = options.el
        this.data = options.data || {}
    }
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