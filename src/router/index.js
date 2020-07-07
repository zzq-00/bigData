import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
// 实例化vue的时候只挂载constantRouter
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/Login')
  }
]

export let asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    redirect: '/cloudPlatform',
    meta: {
      roles: ['Vuvo']
    }
  },
//   {
//     path: '/index',
//     redirect: '/projectManage',
//     meta: {
//       roles: ['Vuvo']
//     }
//   },
  {
    path: '/cloudPlatform',
    component: () => import('@/views/cloudPlatform/index'),
    meta: {
      roles: ['Vuvo']
    }
  },
  {
    path: '/filePreview/:id',
    component: () => import('@/components/filePreview')
  },
  {
    path: '/helpCenter',
    redirect: '/helpCenter/helpInfo',
    component: () => import('@/views/helpCenter/helpCenter'),
    children: [
      {
        path: 'helpInfo',
        component: () => import('@/views/helpCenter/helpInfo')
      }
    ]
  },
  {
    path: '*',
    component: () => import('@/components/NotFound')
  }
]
const routeFiles = require.context('.', false, /\.js$/)
routeFiles.keys().forEach(key => {
  if (key === './index.js') return
  asyncRouterMap = [
    ...routeFiles(key).default,
    ...asyncRouterMap
  ]
})

export default new Router({
  mode: 'history',
  routes: constantRouterMap
})
