import {ctx, indexOf} from './utils'
import {snack} from './snack'
import {wall} from './wall'
import setting from './setting'
class Food {
    constructor() {
        // 食物的坐标
        this.x = 0
        this.y = 0
        // 食物的宽高
        this.width = 15
    }

    produce() {
        this.x = Math.floor(Math.random() * setting.width / this.width) * this.width
        this.y = Math.floor(Math.random() * setting.height / this.width) * this.width
        // 保证食物不会出现在当前蛇的身体上
        if (indexOf(snack.snackCells, [this.x, this.y]) !== -1
            || indexOf(wall.walls, [this.x, this.y]) !== -1) {
            this.produce()
        }
    }

    draw() {
        ctx.fillStyle = 'red'
        ctx.strokeRect(this.x, this.y, this.width, this.width)
        ctx.fillRect(this.x + 2, this.y + 2, this.width - 4, this.width - 4)
    }
}

const food = new Food()

export {
    food
}