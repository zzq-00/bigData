export default [
  {
    path: '/projectLibrary',
    component: () => import('@/views/projectLibrary/index'),
    meta: {
      roles: ['qx50'] // 使用的是权限 第一级 企业项目库
    }
  },
  {
    path: '/projectLibrary/detail',
    component: () => import('@/views/projectLibrary/detailSideBar'),
    redirect: '/projectLibrary/detail/projectInfo',
    children: [
      // 项目信息
      {
        path: 'projectInfo/:projectId',
        component: () => import('@/views/projectLibrary/projectInfo'),
        meta: {
          roles: ['lK0ILB'] // 使用的是权限 第三级 查看项目
        }
      },
      // 单体信息
      {
        path: 'singleInfo/:projectId/:stageId',
        component: () => import('@/views/projectLibrary/singleInfo'),
        meta: {
          roles: ['lK0ILB']
        }
      },
      // 项目文件
      {
        path: 'fileInfo/:projectId',
        component: () => import('@/views/projectLibrary/fileInfo'),
        meta: {
          roles: ['lK0ILB']
        }
      },
      // 新指标数据 - 造价指标
      {
        path: 'newIndexData/costIndex/:projectId/:buildingId',
        component: () => import('@/views/projectLibrary/newIndexData/costIndex'),
        meta: {
          // roles: ['lK0ILB'] // 使用的是权限 第三级 查看项目
        },
      },
      // 新指标数据 - 造价指标下的项目指标
      {
        path: 'newIndexData/proIndex/:projectId/:stageId',
        component: () => import('@/views/projectLibrary/newIndexData/proIndex'),
        meta: {
          // roles: ['lK0ILB'] // 使用的是权限 第三级 查看项目
        }
      },

      // 新指标数据 - 算量指标
      {
        path: 'newIndexData/operandIndex/:projectId/:buildingId',
        component: () => import('@/views/projectLibrary/newIndexData/operandIndex'),
        meta: {
          // roles: ['lK0ILB'] // 使用的是权限 第三级 查看项目
        }
      },
    ],
  },
  // 新指标数据 - 造价指标下的综合单价
  {
    path: '/projectLibrary/comprehensive/:code/:unitProjectId',
    component: () => import('@/views/projectLibrary/newIndexData/CostIndex/comprehensive'),
    meta: {
      // roles: ['lK0ILB'] // 使用的是权限 第三级 查看项目
    }
  },
]
