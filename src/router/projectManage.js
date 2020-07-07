export default [
  {
    path: '/projectManage',
    component: () => import('@/views/projectManage/index')
  },
  {
    path: '/projectManage/detail',
    component: () => import('@/views/projectManage/detailSideBar'),
    redirect: '/projectManage/detail/projectInfo',
    meta: {
      roles: ['30tPRo'] // 使用的是权限 第三级 查看项目
    },
    children: [
      // 项目信息
      {
        path: 'projectInfo/:projectId',
        component: () => import('@/views/projectManage/projectInfo'),
        meta: {
          roles: ['30tPRo'] // 使用的是权限 第三级 查看项目
        }
      },
      // 单体信息
      {
        path: 'singleInfo/:projectId/:stageId',
        component: () => import('@/views/projectManage/singleInfo'),
        meta: {
          roles: ['30tPRo']
        }
      },
      // 项目文件
      {
        path: 'fileInfo/:projectId',
        component: () => import('@/views/projectManage/fileInfo'),
        meta: {
          roles: ['30tPRo'] // 使用的是权限 第三级 查看项目
        }
      },
      // 新指标数据 - 造价指标
      {
        path: 'newIndexData/costIndex/:projectId/:buildingId',
        component: () => import('@/views/projectManage/newIndexData/costIndex'),
        meta: {
          // roles: ['30tPRo'] // 使用的是权限 第三级 查看项目
        },
      },
      // 新指标数据 - 造价指标下的项目指标
      {
        path: 'newIndexData/proIndex/:projectId/:stageId',
        component: () => import('@/views/projectManage/newIndexData/proIndex'),
        meta: {
          // roles: ['30tPRo'] // 使用的是权限 第三级 查看项目
        }
      },

      // 新指标数据 - 算量指标
      {
        path: 'newIndexData/operandIndex/:projectId/:buildingId',
        component: () => import('@/views/projectManage/newIndexData/operandIndex'),
        meta: {
          // roles: ['30tPRo'] // 使用的是权限 第三级 查看项目
        }
      },
    ],
  },
  // 新指标数据 - 造价指标下的综合单价
  {
    path: '/comprehensive/:code/:unitProjectId',
    component: () => import('@/views/projectManage/newIndexData/CostIndex/comprehensive'),
    meta: {
      // roles: ['30tPRo'] // 使用的是权限 第三级 查看项目
    }
  },
]