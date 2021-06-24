import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
import { getToken } from '@/utils/auth' // 从cookie获取 token
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login','/register'] // 无需重定向白名单

router.beforeEach(async(to, from, next) => {
  // 开始进度条
  NProgress.start()
  // 设置页面标题
  document.title = getPageTitle(to.meta.title)

  // 确定用户是否已登录
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // 如果已登录，请重定向到主页
      next({ path: '/' })
      NProgress.done()
    } else {
      // 确定用户是否通过getInfo获得了他的权限角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 获取用户信息
          // 注意：角色必须是对象数组！例如：['admin']或，['developer'，'editor']
          // const { roles } = await store.dispatch('user/getInfo')
          const { roles } = await store.dispatch('user/getInfo')
          const newRoles = JSON.stringify(roles)
          const rolesArr = JSON.parse(newRoles)
          // console.log(rolesArr)
          // 根据角色生成可访问的路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', rolesArr)
          // 动态添加可访问的路由
          router.addRoutes(accessRoutes)
          // hack方法，以确保addRoutes是完整的
          // 设置replace：true，因此导航不会留下历史记录
          next({
            ...to,
            replace: true
          })
        } catch (error) {
          // 删除 token 并进入登录页面重新登录
          await store.dispatch('user/resetToken')
          Message.error({ message: error || 'Has Error' })
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* 没有 token */

    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单中，直接进入
      next()
    } else {
      // 其他无权访问的页面将被重定向到登录页面。
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
