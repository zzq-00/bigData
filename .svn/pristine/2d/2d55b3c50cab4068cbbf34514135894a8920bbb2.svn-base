export default {
  getMousePos (event) {
    var e = event || window.event
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop
    var x = e.pageX || e.clientX + scrollX
    var y = e.pageY || e.clientY + scrollY
    return { 'x': x, 'y': y }
  },
  windowClick (_this) {
    window.onclick = function (event) {
      let self = event.target
      let reg = /(J-list)/
      let hasList = reg.test(self.className) || reg.test(self.parentNode.className) || reg.test(self.parentNode.parentNode.className)
      if (!hasList && self.className !== 'icon-top') {
        // 两个窗口都为空
        _this.renderData.checkbox = false
        _this.renderData.show = false
      }
    }
  },
  goback () {
    history.go(-1) // 返回的列表
  },
  // 取数组的某一个值 -- 优化 因为取值是在localStorage 取的是字符串
  arrayHasVal (string, value) {
    let arr = string.split(',')
    for (let i = 0, len = arr.length; i < len; i++) {
      if (arr[i] === value) {
        return true
      }
    }
    return false
  }
}
/* export var deepCopyFun = function deepCopy (perTh, aftTh) {
  aftTh = aftTh || {}
  for (var i in perTh) {
    if (typeof perTh[i] === 'object') {
      aftTh[i] = Object.assign(perTh[i], {})
      deepCopy(perTh[i], aftTh[i])
    } else if (typeof perTh[i] === 'function') {
      aftTh[i] = perTh[i].constructor
    } else {
      aftTh[i] = perTh[i]
    }
  }
  return aftTh
} */
