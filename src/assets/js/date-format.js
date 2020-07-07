
export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}
function isIE () {
  if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    return true
  } else {
    return false
  }
}
// blob文件
export function downloadBlob (data, name) {
  let url = ''
  if (isIE()) {
    window.navigator.msSaveBlob(new Blob([data]), formatDate(new Date(), 'yyyy-MM-dd') + name + '.xls')
  } else {
    url = window.URL.createObjectURL(new Blob([data]), { type: data.type })
    let aDom = document.createElement('a')
    aDom.setAttribute('href', url)
    if (data.type === 'application/vnd.ms-excel') {
      aDom.setAttribute('download', formatDate(new Date(), 'yyyy-MM-dd') + name + '.xls')
    } else if (data.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || data.type === 'application/octet-stream') {
      aDom.setAttribute('download', formatDate(new Date(), 'yyyy-MM-dd') + name + '.xlsx')
    } else {
      aDom.setAttribute('download', formatDate(new Date(), 'yyyy-MM-dd') + name + '.xls')
    }
    aDom.click()
    aDom.remove()
  }
}
// 路径
export function downloadSingle (data) {
  if (isIE()) {
    window.open(data, '_blank')
  } else {
    let link = data
    // 我是下载
    let aHtml = document.createElement('a')
    aHtml.setAttribute('href', link)
    aHtml.click()
    aHtml.remove()
  }
}
function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}
