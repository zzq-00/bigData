export default [
  {
    path: '/monitorCenter',
    redirect: '/monitorCenter/feedback',
    component: () => import('@/views/monitorCenter/index'),
    meta: {
      roles: ['Vz6x']
    },
    children: [
      {
        path: 'feedback',
        component: () => import('@/views/monitorCenter/feedback'),
        meta: {
          roles: ['QtEgN']
        }
      },
      {
        path: 'dynamicCenter',
        component: () => import('@/views/monitorCenter/dynamicCenter'),
        meta: {
          roles: ['zSsMZ']
        }
      },
      {
        path: 'projectData',
        component: () => import('@/views/monitorCenter/projectData'),
        meta: {
          roles: ['d5g4d']
        }
      },
      {
        path: 'projectData/detail',
        component: () => import('@/views/monitorCenter/projectDetail/detailSideBar'),
        redirect: 'projectData/detail/projectInfo',
        children: [
          // 项目信息
          {
            path: 'projectInfo/:projectId',
            component: () => import('@/views/monitorCenter/projectDetail/projectInfo')
          },
          // 单体信息
          {
            path: 'singleInfo/:projectId',
            component: () => import('@/views/monitorCenter/projectDetail/singleInfo')
          },
          // 项目文件
          {
            path: 'fileInfo/:projectId',
            component: () => import('@/views/monitorCenter/projectDetail/fileInfo')
          }
        ]
      }
    ]
  }
]
