// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
// import '@/assets/css/theme/index.css'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/iconfont.css'

import '@/assets/css/base.css'
import '@/assets/less/resetEle.less'

import './permission'

if (process.env.VUE_APP_MODE === 'production') {
  // 百度统计
  var _hmt = _hmt || [];
  (function () {
    var hm = document.createElement('script')
    hm.src = 'https://hm.baidu.com/hm.js?10b6e3d52d97a826cb04acda751329e1'
    var s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(hm, s)
  })()
}
Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    el.focus()
  }
})

Vue.directive('drag', function (el) {
  // 点击定位于侧边栏最右边的一个div 必须设置
  el.childNodes[el.childNodes.length - 1].onmousedown = function (e) {
    // 去除绑定的动画效果
    el.style.transition = ''
    el.childNodes[0].style.transition = ''
    // 获取鼠标点击处分别与div左边和上边的距离：鼠标位置-div位置
    var divx = e.clientX - el.offsetLeft
    // var divy = e.clientY - el.offsetTop;
    // 包含在onmousedown里，表示点击后才移动，为防止鼠标移出div，使用document.onmousemove
    document.onmousemove = function (e) {
      // 获取移动后div的位置：鼠标位置-divx/divy
      var l = divx - e.clientX
      el.style.width = e.clientX + 'px'
      let arr = el.getElementsByClassName('el-submenu__icon-arrow')
      el.childNodes[0].style.width = e.clientX + 'px'
      el.childNodes[0].style.overflow = 'hidden'
      el.style.minWidth = 55 + 'px'
      el.style.maxWidth = 240 + 'px'
      el.childNodes[0].style.minWidth = '55px'
      el.childNodes[0].style.maxWidth = '240px'
      if (e.clientX <= 55) {
        el.childNodes[2].style.display = 'none'
        el.childNodes[3].style.display = 'block'
        arr.forEach(item => {
          item.style.display = 'none'
        })
      } else {
        arr.forEach(item => {
          item.style.display = 'block'
        })
      }
      if (e.clientX >= 240) {
        el.childNodes[2].style.display = 'block'
        el.childNodes[3].style.display = 'none'
      }
    }
    document.onmouseup = function (e) {
      document.onmousemove = null
      document.onmouseup = null
    }
  }
})
// 权限控制页面元素
Vue.directive('has', {
  inserted(el, binding) {
    let list = JSON.parse(localStorage.ROLES)
    if (list) {
      let hasPermission = list.some((role, index) => {
        if (role) {
          return binding.value.includes(role)
        }
      })
      if (!hasPermission) { // 为什么父元素为null
        el.parentNode && el.parentNode.removeChild(el)
        el.style.display = 'none'
      }
    }
  }
})

// if (sessionStorage.getItem('store')) {
//   store.replaceState(Object.assign({}, store.state, JSON.parse(sessionStorage.getItem('store'))))
//   sessionStorage.removeItem('store')
// }
// //在页面刷新时将vuex里的信息保存到sessionStorage里
// window.addEventListener('beforeunload', () => {
//   sessionStorage.setItem('store', JSON.stringify(store.state))
// })