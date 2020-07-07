export default [{
    path: '/compare/index',
    component: () => import('@/views/compare/index'),
    redirect: '/compare/index/selectStage/:projectId',
    meta: {
        // roles: ['30tPRo'] // 使用的是权限 第三级 查看项目
    },
    children: [
        // 选择项目阶段
        {
            path: 'selectStage/:projectId/:projectName',
            component: () => import('@/views/compare/selectStage'),
            meta: {
                // roles: ['30tPRo'] // 使用的是权限 第三级 查看项目
            }
        },
        // 选择数据比对类型
        {
            path: 'selectDataType/:projectId/:stageId',
            component: () => import('@/views/compare/selectDataType'),
            meta: {
                // roles: ['30tPRo'] // 使用的是权限 第三级 查看项目
            }
        },
    ]
}, {
    path: '/compare/innerMonomerCompare/:projectId/:stageId/:type',
    component: () => import('@/views/compare/innerMonomerCompare'),
},
{
    path: '/compare/history/:id/:type',
    component: () => import('@/views/compare/history/index'),
},
{
    path: '/compare/withinProject/:projectId/:stageId/:type',
    component: () => import('@/views/compare/withinProject'),
},
// 库内数据对比
{
    path: '/compare/inLibrary/:projectId/:stageId/:type',
    component: () => import('@/views/compare/inLibrary'),
},
{
    path: '/compare/comparativeRecord/:projectId',
    component: () => import('@/views/compare/comparativeRecord'),
},

]