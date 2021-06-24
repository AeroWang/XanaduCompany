import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * 注：子菜单仅在route children.length>=1时出现
 *
 * hidden: true                   如果设置为true，项目将不会显示在侧边栏中（默认为false）
 * alwaysShow: true               如果设置为真，将始终显示根菜单
 *                                如果未设置alwaysShow，则当项目有多个子路由时，
 *                                它将变成嵌套模式，否则不显示根菜单
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             名称由<keep alive>使用（必须设置！！！）
 * meta : {
    roles: ['admin','editor']    控制页面角色（可以设置多个角色）
    title: 'title'               侧边栏和面包屑中显示的名称（推荐集）
    icon: 'svg-name'/'el-icon-x' 图标显示在侧边栏中
    breadcrumb: false            如果设置为false，则该项将隐藏在breadcrumb中（默认值为true）
    activeMenu: '/example/list'  如果设置路径，侧边栏将突出高亮显示 设置的路径
  }
 */

/**
 * constantRoutes
 * 没有权限要求的基本页
 * 可以访问所有角色
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [{
      path: 'index',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '首页',
        icon: 'dashboard',
        affix: true
      }
    }]
  },

  {
    path: '/personal',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Personal',
        component: () => import('@/views/personal/index'),
        meta: {
          title: '个人中心',
          icon: 'user'
        }
      }
    ]
  },
  {
    path: '*',
    component: () => import('@/views/404'),
    hidden: true
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/account',
    component: Layout,
    redirect: '/account/list',
    name: 'Account',
    meta: {
      title: '账户管理',
      icon: 'user',
      roles: []
    },
    children: [
      {
        path: 'add_account',
        name: 'AddAccount',
        component: () => import('@/views/account/addAccount/'),
        meta: { title: '添加账户' }
      },
      {
        path: 'manage_account',
        name: 'ManageAccount',
        component: () => import('@/views/account/manageAccount/'),
        meta: { title: '账户列表' }
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/list',
    name: 'Permission',
    alwaysShow: true,
    meta: {
      title: '权限管理',
      icon: 'nested',
      roles: []
    },
    children: [
      {
        path: 'role_manage',
        name: 'RoleManage',
        component: () => import('@/views/permission/roleManage/'), // Parent router-view
        meta: { title: '角色管理' }
      },
      {
        path: 'role_permission',
        name: 'RolePermission',
        component: () => import('@/views/permission/rolePermission/'), // Parent router-view
        meta: { title: '角色权限' }
      },
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/permission/list/index'),
        meta: { title: '权限列表' }
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    redirect: '/article/list',
    name: 'Article',
    meta: {
      title: '文章管理',
      icon: 'el-icon-s-help',
      roles: []
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/article/create'),
        name: 'CreateArticle',
        meta: {
          title: '创建文章',
          icon: 'edit'
        }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/article/edit'),
        name: 'EditArticle',
        meta: {
          title: '编辑文章',
          noCache: true,
          activeMenu: '/article/list'
        },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/article/list'),
        name: 'ArticleList',
        meta: {
          title: '文章列表',
          icon: 'list'
        }
      }
    ]
  },
  {
    path: '/job',
    component: Layout,
    redirect: '/job/list',
    name: 'Job',
    meta: {
      title: '职位管理',
      icon: 'job',
      roles: []
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/jobs/create'),
        name: 'CreateJob',
        meta: {
          title: '创建职位',
          icon: 'edit'
        }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/jobs/edit'),
        name: 'EditJob',
        meta: {
          title: '编辑职位',
          noCache: true,
          activeMenu: '/job/list'
        },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/jobs/list'),
        name: 'JobList',
        meta: {
          title: '职位列表',
          icon: 'list'
        }
      }
    ]
  },
  {
    path: '/product',
    component: Layout,
    redirect: '/product/list',
    name: 'Product',
    meta: {
      title: '产品管理',
      icon: 'product',
      roles: []
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/products/create'),
        name: 'CreateProduct',
        meta: {
          title: '添加产品',
          icon: 'edit'
        }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/products/edit'),
        name: 'EditProduct',
        meta: {
          title: '编辑产品',
          noCache: true,
          activeMenu: '/product/list'
        },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/products/list'),
        name: 'ProductList',
        meta: {
          title: '产品列表',
          icon: 'list'
        }
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'http://localhost:8080/',
        meta: {
          title: 'Xanadu',
          icon: 'link'
        }
      }
    ]
  }
  // // 404 page must be placed at the end !!!
  // {
  //   path: '*',
  //   redirect: '/404',
  //   hidden: true
  // }
]

const createRouter = () => new Router({
  // mode: 'history', // 需要服务端支持
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
router.beforeEach((to, from, next) => {
  /* eslint-disable */
  if (_hmt) {
    if (to.path) {
      _hmt.push(['_trackPageview',to.fullPath]);
    }
  }
  next();
  /* eslint-enable */
})
export default router
