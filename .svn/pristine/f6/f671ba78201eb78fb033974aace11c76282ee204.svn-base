export default [
  // 创建项目
  {
    path: '/createProject',
    component: () => import('@/views/createProject/main'),
    meta: {
      roles: ['pVcP9p'] // 使用的是权限 第三级 创建项目
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/createProject/create'),
        meta: {
          roles: ['pVcP9p']
        }
      },
      {
        path: 'finishProject',
        component: () => import('@/views/createProject/finishPage'),
        meta: {
          roles: ['pVcP9p']
        }
      }
    ]
  }
]
