export default [
  {
    path: '/indicatorLibrary/comprehensive',
    component: () => import('@/views/indicatorLibrary/comprehensive/index'),
    meta: {
      roles: ['92bn']
    },
    children: [
      {
        path: '/indicatorLibrary/comprehensive',
        component: () => import('@/views/indicatorLibrary/comprehensive/list'),
        meta: {
          roles: ['eqtUF']
        }
      },
      {
        name: 'compDetail',
        path: '/indicatorLibrary/comprehensive/:id/:code',
        // path: '/indicatorLibrary/comprehensive',
        component: () => import('@/views/indicatorLibrary/comprehensive/detail'),
        meta: {
          roles: ['eqtUF']
        }
      }
    ]
  },
  {
    path: '/indicatorLibrary/singleItemList',
    component: () => import('@/views/indicatorLibrary/singleitem/index'),
    meta: {
      roles: ['SZMwV']
    },
    children: [
      {
        path: '/indicatorLibrary/singleItemList',
        component: () => import('@/views/indicatorLibrary/singleitem/singleItemList'),
        meta: {
          roles: ['SZMwV']
        }
      },
      {
        path: '/indicatorLibrary/singleDetails/:monomerId',
        component: () => import('@/views/indicatorLibrary/singleitem/listdetails'),
        meta: {
          roles: ['SZMwV']
        }
      }
    ]
  }
]
