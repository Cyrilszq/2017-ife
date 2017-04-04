import {snack} from './snack'
import {food} from './food'
import {ctx} from './utils'

let timer
// let reStartBtn = document.querySelector('#reStart')
//
// reStartBtn.addEventListener('click', () => {
//   start()
// })

const gameInit = () => {
  ctx.fillStyle = '#000000'
  ctx.lineWidth = 1
  ctx.strokeRect(0, 0, 300, 300)
}

const clearRect = () => {
  ctx.clearRect(0, 0, 300, 300)
}

const gameLoop = () => {
  let snackLen = snack.snackCells.length
  let delay = 300 - snackLen * 10
  clearRect()
  gameInit()
  snack.init()
  snack.run()
  snack.checkIfEatFood()
  food.draw()
  if (snack.checkGameOver()) {
    clearTimeout(timer)
    // clearRect()
    ctx.font = "Bold 28px Arial"
    ctx.fillText('Game Over', 60, 140)
    ctx.fillText(`Your Score: ${snackLen * 10}`, 50, 180)
    return
  }
  timer = setTimeout(gameLoop, delay)
}

const start = () => {
  snack.grow()
  snack.grow()
  snack.grow()
  snack.grow()
  food.produce()
  document.body.addEventListener('keydown', (event) => {
    switch (event.keyCode) {
      // up
      case 38:
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
  gameLoop()
}


start()







