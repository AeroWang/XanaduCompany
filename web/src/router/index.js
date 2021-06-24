import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/web/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/index',
    redirect: '/'
  },
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/news',
    name: 'news',
    component: () => import(/* webpackChunkName: "news" */ '../views/web/news.vue')
  },
  {
    path: '/news/:id',
    name: 'newsDetail',
    component: () => import(/* webpackChunkName: "newsDetail" */ '../views/web/newsDetail.vue')
  },
  {
    path: '/product',
    name: 'product',
    component: () => import(/* webpackChunkName: "product" */ '../views/web/product.vue')
  },
  {
    path: '/job',
    name: 'job',
    component: () => import(/* webpackChunkName: "job" */ '../views/web/job.vue')
  },
  {
    path: '/job/:id',
    name: 'jobDetail',
    component: () => import(/* webpackChunkName: "jobDetail" */ '../views/web/jobDetail.vue')
  },
  // {
  //   path: '/customer',
  //   name: 'customer',
  //   component: customer
  // },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/web/login.vue')
  },
  // {
  //   path: '/signup',
  //   name: 'signup',
  //   component: signup
  // },
  {
    path: '*',
    redirect: '/'
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  // 网站统计
  /* eslint-disable */
  if (_hmt) {
    if (to.path) {
      _hmt.push(['_trackPageview', to.fullPath])
    }
  }
  next()
  /* eslint-enable */
})
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})
export default router
