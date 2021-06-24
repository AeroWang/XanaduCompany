import { asyncRoutes, constantRoutes } from '@/router'
import { getAsyncRoutes } from '@/api/role'
import { deepClone } from '../../utils/index'

const clientRoutes = deepClone(asyncRoutes)

// console.log(clientRoutes instanceof Array)

/**
 * 使用meta.role确定当前用户是否具有权限
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return false
  }
}

/**
 *
 * @param {arr} clientAsyncRoutes 前端保存动态路由
 * @param {arr} serverRouter 后端保存动态路由
 */
function makePermissionRouters(serverRouter, clientAsyncRoutes) {
  clientAsyncRoutes.map(ele => {
    if (!ele.name || (!ele.meta && !ele.meta.roles)) return
    let roles_obj
    for (let i = 0; i < serverRouter.length; i++) {
      const element = serverRouter[i]
      if (ele.name === element.name) {
        roles_obj = element
        ele.meta.roles = roles_obj.meta.roles
      }
    }
    // console.log(ele)
    // console.log(roles_obj)
    // 过滤 undefined
    // if (roles_obj) {
    //   ele.meta.roles = roles_obj.meta.roles
    //   console.log(ele)
    // }
    // 如果前端某个路由有子路由，则继续
    if (ele.children) {
      makePermissionRouters(serverRouter, ele.children)
    }
  })
  return clientAsyncRoutes
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  // console.log(routes)
  routes.forEach(route => {
    const tmp = { ...route }

    if (hasPermission(roles, tmp)) {
      // console.log(tmp)
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  async generateRoutes({ commit }, roles) {
    let PermissionRouters = await getAsyncRoutes().then(res => {
      const data = res.data.data.asyncRoutes
      PermissionRouters = makePermissionRouters(data, clientRoutes)
      return PermissionRouters
    })
    // console.log(PermissionRouters)
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = PermissionRouters || []
      } else {
        accessedRoutes = filterAsyncRoutes(PermissionRouters, roles)
        // console.log(accessedRoutes)
      }
      // console.log(accessedRoutes)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
