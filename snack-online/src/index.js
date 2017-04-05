import {snack} from './snack'
import {food} from './food'
import {ctx} from './utils'
// 暂时采用setTimeout做动画
let timer
// 画出游戏边框
const gameInit = () => {
  ctx.fillStyle = '#000000'
  ctx.lineWidth = 1
  ctx.strokeRect(0, 0, 300, 300)
}
// 每一帧开始时清除当前canvas
const clearRect = () => {
  ctx.clearRect(0, 0, 300, 300)
}

const gameLoop = () => {
  let snackLen = snack.snackCells.length
  // 根据蛇的长度决定setTimeout延迟，即蛇越长，运动的越快
  let delay = 300 - snackLen * 10
  clearRect()
  gameInit()
  // 画出蛇
  snack.init()
  // 更新蛇的身体
  snack.run()
  // 检测蛇是否吃到食物
  snack.checkIfEatFood()
  // 画出食物
  food.draw()
  // 检测游戏是否结束
  if (snack.checkGameOver()) {
    clearTimeout(timer)
    ctx.font = "Bold 28px Arial"
    ctx.fillText('Game Over', 60, 140)
    ctx.fillText(`Your Score: ${snackLen * 10}`, 50, 180)
    return
  }
  timer = setTimeout(gameLoop, delay)
}
// 游戏开始
const start = () => {
  // 出生时让蛇有4节身体
  for(let i=0;i<5;i++){
    snack.grow()
  }
  // 随机产生食物
  food.produce()

  document.body.addEventListener('keydown', (event) => {
    switch (event.keyCode) {
      // up
      case 38:
        // 防止调头运动
        if (snack.direction !== 'down') {
          snack.direction = 'up'
        }
        break
      // left
      case 37:
        if (snack.direction !== 'right') {
          snack.direction = 'left'
        }
        break
      // right
      case 39:
        if (snack.direction !== 'left') {
          snack.direction = 'right'
        }
        break
      // down
      case 40:
        if (snack.direction !== 'up') {
          snack.direction = 'down'
        }
        break
    }
  })
  // 不断渲染
  gameLoop()
}


start()







