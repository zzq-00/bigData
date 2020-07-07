export default [
  {
    path: '/knowledgeBase',
    component: () => import('@/views/knowledgeBase/index'),
    redirect: '/knowledgeBase/recommend',
    children: [
      {
        path: 'recommend',
        component: () => import('@/views/knowledgeBase/recommend')
      },
      {
        path: 'searchResult',
        component: () => import('@/views/knowledgeBase/searchResult')
      },
      {
        path: 'uploadfile',
        component: () => import('@/views/knowledgeBase/uploadfile')
      },
      {
        path: 'personalCenter',
        component: () => import('@/views/knowledgeBase/personalCenter')
      }
    ]
  }
]
