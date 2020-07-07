import router from './router'
import { asyncRouterMap, constantRouterMap } from '@/router'
import { getQueryString } from '@/assets/js/Utils'
import api from '@/fetch/api'
import home from '@/fetch/home'
import { Message } from 'element-ui'
// 循环一次
var bool = true
router.beforeEach((to, from, next) => {
  let map = asyncRouterMap
  // 请求权限
  let roleInfo
  // 通过接口获取用户的权限
  async function getCurrentUserInfo() {
    let responseParams = getQueryString('authentication')
    if (responseParams) {
      await home.publishPeopleLogin(responseParams).then(res => {
        window.localStorage.userId = res.data.userId
        window.localStorage.userName = res.data.userName
      })
    } else if (to.path !== '/login') {
      window.location.href = '/login?redirectUrl=' + window.location.origin + to.path
    }
    // } else {
    //   window.location.href = process.env.VUE_APP_LOGIN_ROOT + '/login/index?subsystemUrl=' + window.location.href
    // }
    window.localStorage.userId && await api.getCurrentUserInfo(window.localStorage.userId).then(res => {
      if (res && res.data) {
        roleInfo = res.data
        localStorage.setItem('realName', res.data.realName)
        localStorage.setItem('roleInfo', JSON.stringify(res.data))
        window.location.replace(window.location.href.split('?')[0])
      }
    })
  }
  // 判断当前是否缓存了权限
  async function roleInfoFun() {
    if (!!localStorage.getItem('roleInfo') && JSON.parse(localStorage.getItem('roleInfo')) && (window.localStorage.userId)) {
      roleInfo = JSON.parse(localStorage.roleInfo)
    } else { // tip: 必须要取到userid ，否则返回普通用户的权限
      await getCurrentUserInfo()
    }
  }
  // 获取权限之后的操作
  roleInfoFun().then(() => {
    if (bool && (window.localStorage.userId)) {
      if (!roleInfo || !roleInfo.baseFirstFunctionList) {
        localStorage.removeItem('userName')
        localStorage.removeItem('userId')
        localStorage.removeItem('ROLES')
        localStorage.removeItem('roleInfo')
        Message({ showClose: true, type: 'error', message: '您没有权限，请联系管理员' })
      }
      let accessedRouters = []
      let firstroles = roleInfo.baseFirstFunctionList.map(item => item.functionEnum)
      let secondroles = roleInfo.baseSecondFunctionList.map(item => item.functionEnum)
      let thirdroles = roleInfo.baseFunctionList.map(item => item.functionEnum)
      let ROLES = []
      ROLES = ROLES.concat(firstroles, secondroles, thirdroles)
      localStorage.setItem('ROLES', JSON.stringify(ROLES))
      accessedRouters = filterAsyncRouter(map, ROLES)
      // 动态添加路由
      let allRouters = constantRouterMap.concat(accessedRouters)
      router.addRoutes(allRouters)
      bool = false
      if (!!localStorage.getItem('initURL') && JSON.parse(localStorage.initURL)) {
        // 处理路由
        let url = JSON.parse(localStorage.initURL).split('#')[1]
        // 登录时，路由跳转
        next({
          path: url
        })
        localStorage.removeItem('initURL')
      } else {
        next({ ...to })
      }
    } else if (bool) {
      // 没有登录返回字符串才跳转
      let responseParams = getQueryString('authentication')
      if (!responseParams && window.location.pathname !== '/login') {
        let url = window.location.href
        localStorage.setItem('initURL', JSON.stringify(url))
        window.location.href = '/login?redirectUrl=' + window.location.origin + to.path
        // window.location.href = process.env.VUE_APP_LOGIN_ROOT + '/login/index?subsystemUrl=' + window.location.href
      }
      //  else {
      //   console.log('没有userid，又有responseParams')
      // }
    }
  })
  next()
})
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(map, roles) {
  const accessedRouters = map.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      // 子导航的子导航
      if (route.meta && route.meta.children && route.meta.children.length) {
        route.meta.children = filterAsyncRouter(route.meta.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}
