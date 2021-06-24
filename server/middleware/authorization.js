/**
 * @Description:
 * @author Aerowang
 * @date 2021/5/27
 */
const { varifyToken } = require('../utils/utils')
const RolesService = require('../services/admin/role/rolesService')
module.exports = function () {
  return async (ctx, next) => {
    const url = ctx.path
    // 对前端展示、登录、注册等路由进行放行
    if (url.substring(0, 11) === '/api/v1/web'
      || url === '/api/v1/admin/login'
      || url === '/api/v1/admin/register'
      || url === '/api/v1/admin/logout') {
      await next()
    } else {
      // 判断headers 中是否存在 authorization
      if (ctx.headers && ctx.headers.authorization === undefined) {
        ctx.status = 401
        ctx.body = {
          status: 401,
          msg: '无效token，没有访问权限'
        }
      } else {
        try {
          // 若存在，验证 token 是否等于当前登录用户的用户名，等于的话，再判断此用户的角色表中的 permission 字段
          // 是否存在 ctx.url ，是的话 next()，否则未授权
          // 在else中再深入判断它是否能够访问该接口的权限就是啦{验证token，判断用户是否有权限能访问此接口路径}
          const token = ctx.headers.authorization
          // 解密token
          const payload = await varifyToken(token)
          const userInfo = payload.userInfo
          // roles:['管理员']，转为字符串
          const roleName = userInfo.roles.toString()
          const result = await RolesService.getRolePermission(roleName)
          const permissionApi = []
          for (let i = 0; i < result.length; i++) {
            const tmp = {
              // 拼接api路径
              path: '/api/v1/admin' + result[i].path,
              method: result[i].method
            }
            permissionApi.push(tmp)
          }
          const res = permissionApi.filter(item => {
            const index = item.path.indexOf(':')
            if (index !== -1) {
              // console.log(index)
              // 根据 :id等 动态拼接api路径
              item.path = item.path.substring(0, index) + `${ctx.url.substring(index)}`
              // console.log('index: '+index+' '+item.path)
            }
            // 过滤出当前访问的api接口
            return new RegExp(item.path, 'g').test(ctx.url) && item.method.toUpperCase() === ctx.request.method.toUpperCase()
          })
          // 返回当前访问的api接口列表
          // console.log(res)
          if (res.length === 0) {
            ctx.status = 401
            ctx.body = {
              code: 401,
              msg: '您的账户没有该访问权限！'
            }
          } else {
            await next()
          }
        } catch (err) {
          // 捕获 jwt 的异常信息
          if (err.message === 'jwt expired') {
            ctx.status = 50014
            ctx.body = {
              code: 50014,
              msg: 'token 过期'
            }
          } else if (err.message === 'jwt malformed') {
            ctx.status = 50008
            ctx.body = {
              code: 50008,
              msg: 'token 无效'
            }
          } else {
            ctx.status = 500
            ctx.body = {
              code: 500,
              msg: err.message
            }
          }
        }
      }
    }
  }
}
