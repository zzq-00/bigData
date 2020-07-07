function getPostfix(filename) {
  var index = filename.lastIndexOf('.')
  if (index === -1) return ''
  return filename.substring(index)
}
function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return ''
}
function isDisplay(that, className, vueData) {
  let dNone = document.getElementsByClassName(className)[0]
  if (dNone && !dNone.style.operate) {
    that[vueData] = true
  }
}
function getFile(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText)
        }
      }
    }
    xhr.open('GET', url)
    xhr.send()
  })
}
/**
 * 封装吸顶函数，需结合css实现。
 */
function ceiling(obj) {
  var ot = obj.offsetTop
  document.onscroll = function () {
    var st = document.body.scrollTop || document.documentElement.scrollTop
    // 在这里给obj添加一个自定义属性。className可能会影响原有的class
    obj.setAttribute('data-fixed', st >= ot ? 'fixed' : '')
  }
}

export { getPostfix, getQueryString, isDisplay, getFile, ceiling }
