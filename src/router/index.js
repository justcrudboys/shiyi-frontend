import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/Profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  },

  {
    path: '/MySubscription',
    component: Layout,
    children: [{
      path: '',
      name: 'mysubscription',
      component: () => import('@/views/MySubscription/index')
    }]
  },
  {
    path: '/SearchCreator',
    component: Layout,
    hidden: true,
    children: [{
      path: '',
      name: 'searchcreator',
      component: () => import('@/views/CreatorSearch/index')
    }]
  },
  {
    path: '/CreatorInfo',
    component: Layout,
    hidden: true,
    children: [{
      path: '',
      name: 'creatorinfo',
      component: () => import('@/views/CreatorInfo/index')
    }]
  },
  {
    path: '/ChannelDetail',
    component: Layout,
    hidden: true,
    children: [{
      path: '',
      name: 'channel',
      component: () => import('@/views/ChannelDetail/index')
    }]
  },
  {
    path: '/MyChannel',
    component: Layout,
    children: [{
      path: '',
      name: 'mychannel',
      component: () => import('@/views/MyChannel/index'),
      meta: { title: '我的作品频道', icon: 'dashboard' }
    }]
  },
  {
    path: '/ChannelCreation',
    component: Layout,
    hidden: true,
    children: [{
      path: '',
      name: 'channelcreation',
      component: () => import('@/views/ChannelCreation/index')
    }]
  },
  {
    path: '/ChannelManagement',
    component: Layout,
    hidden: true,
    children: [{
      path: '',
      name: 'channelmanagement',
      component: () => import('@/views/ChannelManagement/index')
    }]
  },
  {
    path: '/ChannelInfo',
    component: Layout,
    hidden: true,
    children: [{
      path: '',
      name: 'channelinfo',
      component: () => import('@/views/ChannelInfo/index')
    }]
  },
  {
    path: '/OrderCreation',
    component: Layout,
    hidden: true,
    children: [{
      path: '',
      name: 'ordercreation',
      component: () => import('@/views/OrderCreation/index')
    }]
  },
  {
    path: '/HomePage',
    component: Layout,
    hidden: true,
    children: [{
      path: '',
      name: 'homepage',
      component: () => import('@/views/HomePage/index')
    }]
  },
  {
    path: '/MyOrder',
    component: Layout,
    hidden: true,
    children: [{
      path: '',
      name: 'myorder',
      component: () => import('@/views/MyOrder/index')
    }]
  },
  {
    path: '/ChannelSearch',
    component: Layout,
    hidden: true,
    children: [{
      path: '',
      name: 'channelsearch',
      component: () => import('@/views/ChannelSearch/index')
    }]
  },
  {
    path: '/ChannelExploration',
    component: Layout,
    hidden: true,
    children: [{
      path: '',
      name: 'channelexploration',
      component: () => import('@/views/ChannelExploration/index')
    }]
  },
  {
    path: '/CreatorSearch',
    component: Layout,
    hidden: true,
    children: [{
      path: '',
      name: 'creatorsearch',
      component: () => import('@/views/CreatorSearch/index')
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Mychannel',
        component: () => import('@/views/MyChannel/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },
  {
    path: '/PostCreation',
    component: Layout,
    hidden: true,
    children: [{
      path: '',
      name: 'postCreation',
      component: () => import('@/views/PostCreation/index')
    }]
  },
  {
    path: '/PostDetail',
    component: Layout,
    hidden: true,
    children: [{
      path: '',
      name: 'postDetail',
      component: () => import('@/views/PostDetail/index')
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
