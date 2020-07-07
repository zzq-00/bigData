export default [
  {
    path: '/controlPanel',
    redirect: '/controlPanel/usercontrol',
    component: () => import('@/views/controlPanel/index'),
    meta: {
      roles: ['ywWY']
    },
    children: [
      {
        path: 'usercontrol',
        name: 'usercontrol',
        component: () => import('@/views/controlPanel/Usercontrol'),
        meta: {
          roles: ['JTFGQ'] // 第二级 用户管理
        }
      }
      // {
      //   path:'organization',
      //   name:'organization',
      //   component:() => import('@/views/controlPanel/Organization'),
      // },
    ]
  },
  {
    path: '/controlPanel/rolesMain',
    name: 'role',
    component: () => import('@/views/controlPanel/roles/rolesMain'),
    meta: {
      roles: ['o4xNn'] // 第二级 角色权限
    }
  },
  {
    path: '/controlPanel/editRoles/:id',
    name: 'editrole',
    component: () => import('@/views/controlPanel/roles/editRoles'),
    meta: {
      roles: ['HPpj3o']
    }
  }
]
