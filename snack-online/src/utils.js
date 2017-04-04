let canvas = document.querySelector('#canvas')
let ctx = canvas.getContext('2d')

const indexOf = (arr, targetVal) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i][0] === targetVal[0] && arr[i][1] === targetVal[1]) {
      return i
    }
  }
  return -1
}

export {
  ctx,
  indexOf
}