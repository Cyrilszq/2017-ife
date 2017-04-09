import {snack} from './snack'
import {food} from './food'
import {ctx} from './utils'
import {wall} from './wall'
import setting from './setting'

const width = setting.width
const height = setting.height
const centerX = width / 2
const centerY = height / 2

let messageCanvas = document.querySelector('#messageCanvas')
let ctxMsg = messageCanvas.getContext('2d')
messageCanvas.width = 300
messageCanvas.height = 300
// 暂时采用setTimeout做动画
let timer
let stop = false
let btns = document.querySelector('.btn-wrap')
// 游戏模式
let mode
// 得分
let score = 0
// 当前关卡
let level = 0
drawGameBorder()

btns.addEventListener('click', (event) => {
    mode = event.target.id
    // 不手动使其失焦的话空格会再次触发按钮click事件
    event.target.blur()
    // 重置游戏
    reset()
    initMap()
    gameLoop()
})


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
        // 空格，暂停
        case 32:
            if (!stop) {
                showStopMsg()
                clearTimeout(timer)
                stop = true
            } else {
                gameLoop()
                stop = false
            }
    }
})

function reset() {
    level = 0
    score = 0
    wall.walls = []
    clearRect()
    snack.init()
    clearTimeout(timer)
}

function drawScore() {
    ctxMsg.fillStyle = '#000000'
    ctxMsg.font = setting.fontStyle
    ctxMsg.clearRect(0, 0, 300, 300)
    score = (snack.snackCells.length - 5) * 10
    ctxMsg.fillText(`Score:  ${score}`, 60, 60)
    ctxMsg.fillText(`Level:  ${level}`, 60, 100)
}

// 画出游戏边框
function drawGameBorder() {
    ctx.fillStyle = '#000000'
    ctx.lineWidth = 1
    ctx.strokeRect(0, 0, width, height)
}

// 每一帧开始时清除当前canvas
function clearRect() {
    ctx.clearRect(0, 0, width, height)
}

function showStopMsg() {
    ctx.font = setting.fontStyle
    ctx.fillStyle = 'rgba(0,0,0,0.7)'
    ctx.fillRect(0, 0, width, height)
    ctx.fillStyle = 'red'
    ctx.textAlign = 'center'
    ctx.fillText('Game Stop', centerX, centerY)
}

function gameLoop() {
    let delay
    let snackLen = snack.snackCells.length
    switch (mode) {
        case 'mode1':
            // 根据蛇的长度决定setTimeout延迟，即蛇越长，运动的越快
            delay = 300 - snackLen * 10
            clearRect()
            drawGameBorder()
            // 画出蛇
            snack.draw()
            // 更新蛇的身体
            snack.run()
            // 检测蛇是否吃到食物
            snack.checkIfEatFood()
            // 画出食物
            food.draw()
            drawScore()
            // 检测游戏是否结束
            if (snack.checkGameOver()) {
                clearTimeout(timer)
                showGameOver()
                return
            }
            timer = setTimeout(gameLoop, delay)
            break
        case 'mode2':
            delay = (10 - level) * 30
            clearRect()
            drawGameBorder()
            // 画出蛇
            snack.draw()
            // 更新蛇的身体
            snack.run()
            // 检测蛇是否吃到食物
            if (snack.checkIfEatFood()) {
                // 每长4节进入下一关
                if ((snackLen - 5) % 4 === 0) {
                    level++
                }
            }
            // 画出食物
            food.draw()
            // 检测游戏是否结束
            drawScore()
            if (snack.checkGameOver()) {
                clearTimeout(timer)
                showGameOver()
                return
            }
            timer = setTimeout(gameLoop, delay)
            break
        case 'mode3':
            delay = (10 - level) * 30
            clearRect()
            drawGameBorder()
            wall.draw()

            // 画出蛇
            snack.draw()
            // 更新蛇的身体
            snack.run()
            // 检测蛇是否吃到食物
            if (snack.checkIfEatFood()) {
                // 每长4节进入下一关
                if ((snackLen - setting.initLength) % 4 === 0) {
                    level++
                    wall.init()
                }
            }
            // 画出食物
            food.draw()
            // 检测游戏是否结束
            drawScore()
            if (snack.checkGameOver()) {
                clearTimeout(timer)
                showGameOver()
                return
            }
            timer = setTimeout(gameLoop, delay)
            break
    }

}

function showGameOver() {
    ctx.font = setting.fontStyle
    ctx.textAlign = 'center'
    ctx.fillText('Game Over', centerX, centerY - 20)
    ctx.fillText(`Your Score: ${score}`, centerX, centerY + 20)
}

// 初始化地图
function initMap() {
    // 出生时让蛇有4节身体
    for (let i = 0; i < setting.initLength - 1; i++) {
        snack.grow()
    }

    if (mode === 'mode3') {
        wall.init()
    }
    // 随机产生食物
    food.produce()
    snack.draw()
    food.draw()
}











