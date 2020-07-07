let Obj = {
  tablefold: function (val) {
    // val:compare  数据对比
    let Icon = document.getElementsByClassName('el-table__expand-icon')
    let elTableRow = document.getElementsByClassName('el-table__row')
    //把表格原来的箭头点击分级 换成+-号
    for (let i = 0; i < Icon.length; i++) {
      const element = Icon[i]
      const expandedi = element.children[0]
      expandedi.classList.remove('el-icon-arrow-right')
      let Findex = expandedi.classList.value.indexOf('el-icon-plus')
      // val == 'comprehensive' ? expandedi.classList.add('el-icon-plus') : expandedi.classList.add('el-icon-minus')
      if (val == 'comprehensive') {
        expandedi.classList.remove('el-icon-minus')
        expandedi.classList.add('el-icon-plus')
      } else if (Findex == -1) {
        expandedi.classList.add('el-icon-minus')
      }
      expandedi.classList.add('expandsi')
      if (element.classList.value.indexOf('el-table__expand-icon--expanded') != -1) {
        expandedi.classList.add('el-icon-minus')
      } else {
        expandedi.classList.add('el-icon-plus')
      }
      element.onclick = function (target) {
        if (element.classList.value.indexOf('el-table__expand-icon--expanded') != -1) {
          expandedi.classList.add('el-icon-minus')
          expandedi.classList.remove('el-icon-plus')
        } else {
          // 懒加载的
          if (expandedi.classList.value.indexOf('el-icon-arrow-right') > -1) {
            expandedi.classList.remove('el-icon-arrow-right')
            expandedi.classList.add('expandsi')
          }
          expandedi.classList.remove('el-icon-minus')
          expandedi.classList.add('el-icon-plus')
        }
      }
    }
    // 获取表格的每一行 指标数据找到每一行的第一级 添加粉色背景 数据对比为白色
    for (let i = 0; i < elTableRow.length; i++) {
      if (elTableRow[i].classList.value.indexOf('expanded') != -1 && elTableRow[i].classList.length == 2) {
        let cellOne = elTableRow[i].children[0].children[0]
        cellOne.style.paddingLeft = '33px'
      }
      if (elTableRow[i].className.includes('el-table__row--level-0') || elTableRow[i].classList.value.indexOf('expanded') != -1) {
        if (val == 'compare' || val == 'comprehensive') {
          elTableRow[i].style.background = '#fff'
        } else {
          elTableRow[i].style.background = '#FBEBEC'
        }
      }
      if (elTableRow[i].className.includes('el-table__row--level-1')) {
        if (val == 'personnelMachine') {      //人材机汇总表
          let headers = elTableRow[i].getElementsByClassName('expandsi')
          if (headers.length > 0) {
            headers[0].classList.remove('el-icon-minus')
            headers[0].classList.add('el-icon-plus')
          }
        }
      }
      if (elTableRow[i].className.includes('el-table__row--level-3')) {
        if (val == 'price') {
          let headers = elTableRow[i].getElementsByClassName('expandsi')
          if (headers.length > 0) {
            headers[0].classList.remove('el-icon-minus')
            headers[0].classList.add('el-icon-plus')
          }
        }
      }
    }
  },
  getData: function (val) {
    return val || val == 0 ? val : ''
  },
  // 造价比例
  proportion: function (val) {
    if (val != '-' || val == 0) {
      return Math.round(((val * 100) * 100)) / 100
    } else if (val == '-') {
      return '-'
    } else {
      return ' '
    }
  },
}
export function tableFolding(params) {
  let res = {}
  params.forEach(element => {
    res[element] = Obj[element]
  })
  return res
}
