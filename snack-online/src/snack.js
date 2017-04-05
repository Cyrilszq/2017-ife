import {ctx, indexOf} from './utils'
import {food} from './food'
class Snack {
  constructor() {
    // 每一节的宽高
    this.width = 15
    this.direction = 'up'
    // 默认尾部坐标
    this.tailX = 165
    this.tailY = 165
    // 保存蛇每一节的坐标
    this.snackCells = []
    this.snackCells.push([this.tailX, this.tailY])
  }

  init() {
    ctx.lineWidth = 1
    ctx.fillStyle = '#000000'
    // 每次只需根据当前保存的每一节蛇身坐标画出蛇即可
    for (let i = 0, len = this.snackCells.length; i < len; i++) {
      ctx.strokeRect(this.snackCells[i][0], this.snackCells[i][1], this.width, this.width)
      ctx.fillRect(this.snackCells[i][0] + 2, this.snackCells[i][1] + 2, this.width - 4, this.width - 4)
    }
  }

  run() {
    // 运动时只需将蛇尾巴直接去掉，然后根据当前运动方向添加一个蛇头
    // 这样蛇就动起来了
    this.snackCells.pop()
    let headX = this.snackCells[0][0]
    let headY = this.snackCells[0][1]
    let len = this.snackCells.length
    this.tailX = this.snackCells[len - 1][0]
    this.tailY = this.snackCells[len - 1][1]
    switch (this.direction) {
      case 'up':
        this.snackCells.unshift([headX, headY - this.width])
        break
      case 'down':
        this.snackCells.unshift([headX, headY + this.width])
        break
      case 'left':
        this.snackCells.unshift([headX - this.width, headY])
        break
      case 'right':
        this.snackCells.unshift([headX + this.width, headY])
        break
    }
  }


  checkIfEatFood() {
    let headX = this.snackCells[0][0]
    let headY = this.snackCells[0][1]
    if (headX === food.x && headY === food.y && headX + this.width === food.x + this.width && headY + this.width === food.y + this.width) {
      snack.grow()
      food.produce()
    }
  }
  // 撞到自己，或者超出边框，游戏结束
  checkGameOver() {
    let headX = this.snackCells[0][0]
    let headY = this.snackCells[0][1]
    let flag = false
    if (headX < 0 || headX >= 300 || headY < 0 || headY >= 300) {
      flag = true
    }
    if (indexOf(this.snackCells, [headX, headY]) > 0) {
      flag = true
    }
    return flag
  }
  // 依次检测尾部的上下左右找出一个可以生长的方向
  grow() {
    let cell = this.snackCells
    if (indexOf(cell, [this.tailX, this.tailY + this.width]) === -1)
      this.tailY += this.width
    else if (indexOf(cell, [this.tailX - this.width, this.tailY]) === -1)
      this.tailX -= this.width
    else if (indexOf(cell, [this.tailX + this.width, this.tailY]) === -1)
      this.tailX += this.width
    else if (indexOf(cell, [this.tailX, this.tailY - this.width]) === -1)
      this.tailY -= this.width
    cell.push([this.tailX, this.tailY])
  }
}

const snack = new Snack()

export{
  snack
}