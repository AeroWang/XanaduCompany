const RoutesService = require('../../../services/admin/role/routesService')
const {
  varifyToken
} = require('../../../utils/utils')
module.exports = {
  routes: async (ctx) => {
    const asyncRoutes = []
    let token = ctx.request.headers['authorization']
    const tokenInfo = await varifyToken(token)
    const role = tokenInfo.userInfo.roles
    // 根据角色名称查询角色ID（roleId）
    const roleInfo = await RoutesService.getRoleInfo(role)
    if (roleInfo) {
      const roleId = roleInfo[0].dataValues.id
      // console.log(roleId)
      // 根据角色ID查询匹配的菜单列表ID（menuIdList）
      const roleMenuInfo = await RoutesService.getRoleMenuId(roleId)
      if (roleMenuInfo.length > 0) {
        const menuIdList = []
        for (let i = 0; i < roleMenuInfo.length; i++) {
          const data = roleMenuInfo[i].dataValues.awMenuListId
          menuIdList.push(data)
        }
        // console.log(menuIdList)
        const routesList = []
        for (const item of menuIdList) {
          const tmpRoutes = await RoutesService.getRoutes(item)
          // console.log(tmpRoutes[0].dataValues)
          routesList.push(tmpRoutes[0].dataValues)
        }
        // console.log(routesList)
        
        for (let i = 0; i < routesList.length; i++) {
          // console.log(routesList[i])
          let newObj = {}
          newObj.path = routesList[i].path
          newObj.name = routesList[i].name
          newObj.meta = {}
          newObj.meta.title = routesList[i].title
          newObj.meta.icon = routesList[i].icon
          newObj.meta.roles = role
          asyncRoutes.push(newObj)
        }
      }
      asyncRoutes.push({
        path: '*',
        redirect: '/404',
        hidden: true
      })
      // console.log(asyncRoutes)
      ctx.body = {
        status: 200,
        msg: '获取成功',
        data: { asyncRoutes }
      }
    } else {
      ctx.body = {
        status: 'error',
        msg: '查询失败',
        data: null
      }
    }
  }
}
