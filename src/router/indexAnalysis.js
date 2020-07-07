export default [{
    path: '/indexAnalysis/index',
    component: () => import('@/views/indexAnalysis/index'),
    redirect: '/indexAnalysis/index/selectFile/:projectId',
    meta: {
        // roles: ['30tPRo'] // 使用的是权限 第三级 查看项目
    },
    children: [
        // 选择文件
        {
            path: 'selectFile/:projectId',
            component: () => import('@/views/indexAnalysis/selectFile'),
            meta: {
                // roles: ['30tPRo'] // 使用的是权限 第三级 查看项目
            }
        },
        // 匹配单项工程 /:projectId 项目id folderId 文件夹id  stageId编制阶段id
        {
            path: 'matching/:projectId/:folderId/:stageId',
            component: () => import('@/views/indexAnalysis/matching'),
            meta: {
                // roles: ['30tPRo'] // 使用的是权限 第三级 查看项目
            }
        },
        // 填写单项工程信息 /:projectId
        {
            path: 'fillInInfo/:stageId/:projectId',
            component: () => import('@/views/indexAnalysis/fillInInfo'),
            meta: {
                // roles: ['30tPRo'] // 使用的是权限 第三级 查看项目
            }
        },
        // 分析结果 /:projectId
        {
            path: 'result/:projectId',
            component: () => import('@/views/indexAnalysis/result'),
            meta: {
                // roles: ['30tPRo'] // 使用的是权限 第三级 查看项目
            }
        },
    ]
},
{
    path: '/indexAnalysis/record/:projectId',
    component: () => import('@/views/indexAnalysis/record'),
}
]