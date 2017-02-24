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

            this.$fragment = this.nodeToFragment(this.$el);
            this.compile(this.$fragment);

            this.$el.appendChild(this.$fragment);
        }
    }

    nodeToFragment(node) {
        let fragment = document.createDocumentFragment(), child;
        while (child = node.firstChild) {
            if (this.isIgnorable(child)) {     // delete '\n'
                node.removeChild(child);
            } else {
                fragment.appendChild(child);   // 移动操作，将child从原位置移动添加到fragment
            }
        }
        return fragment;
    }

    isIgnorable(node) {
        var regIgnorable = /^[\t\n\r]+/;
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

    compileTextNode(node) {
        let text = node.textContent.trim()
        let exp = parseTextExp(text)
        // let code = `with (this.data){node.textContent = eval(exp);console.log(node.textContent)}`
        // new Function(code)
        // console.log(node.textContent)
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