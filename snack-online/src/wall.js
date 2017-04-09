import {snack} from './snack'
import {ctx, indexOf} from './utils'
import setting from './setting'
class Wall {
    constructor() {
        this.width = 15
        this.walls = []
    }

    init() {
        this.walls = []
        // 产生20块墙
        for (let i = 0; i < 20; i++) {
            let x = Math.floor(Math.random() * setting.width / this.width) * this.width
            let y = Math.floor(Math.random() * setting.height / this.width) * this.width
            // 保证墙不会出现在当前蛇的身体上
            if (indexOf(snack.snackCells, [this.x, this.y]) !== -1) {
                this.init()
            }
            this.walls.push([x, y])
        }
    }

    draw() {
        this.walls.forEach((wall) => {
            ctx.fillStyle = 'blue'
            ctx.strokeRect(wall[0], wall[1], this.width, this.width)
            ctx.fillRect(wall[0] + 2, wall[1] + 2, this.width - 4, this.width - 4)
        })
    }
}


const wall = new Wall()

export {
    wall
}