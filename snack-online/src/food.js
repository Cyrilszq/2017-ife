import {ctx, indexOf} from './utils'
import {snack} from './snack'

class Food {
  constructor() {
    this.x = 0
    this.y = 0
    this.width = 15
  }

  produce() {
    this.x = Math.floor(Math.random() * 20) * 15
    this.y = Math.floor(Math.random() * 20) * 15

    if (indexOf(snack.snackCells, [this.x, this.y]) !== -1) {
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