/**
 * @Description:
 * @author Aerowang
 * @date 2021/5/27
 */
const moment = require('moment') // 时间格式化插件
const RolesService = require('../../../services/admin/role/rolesService')
module.exports = {
  // 获取角色列表
  getRolesList: async ctx => {
    const result = await RolesService.getRolesList()
    const rolesList = []
    for (let i = 0; i < result.length; i++) {
      const data = result[i].dataValues
      // 格式化时间为 年-月-日
      let date = data.update_time
      data.update_time = moment(date).format('YYYY-MM-DD')
      rolesList.push(data)
    }
    if (result) {
      ctx.body = {
        status: 200,
        msg: '获取成功',
        data: {
          rolesList: rolesList
        }
      }
    }
  },
  getRoleDetail: async ctx => {
    const roleId = ctx.request.path.substring(20)
    const result = await RolesService.getRoleDetail(roleId)
    if (result) {
      ctx.body = {
        status: 200,
        msg: '获取成功',
        data: {
          roleDetail: result.dataValues
        }
      }
    }
  },
  addRole: async ctx => {
    const params = ctx.request.body
    await RolesService.addRole(params)
    ctx.body = {
      status: 200,
      msg: '角色创建成功',
      data: null
    }
  },
  updateRole: async ctx => {
    const roleId = ctx.request.path.substring(20)
    const result = await RolesService.getRoleDetail(roleId)
    if (result.dataValues.id === '1') {
      ctx.body = {
        status: 1000,
        msg: '超级管理员不可被修改',
        data: null
      }
    } else {
      const roleObj = ctx.request.body
      const roleObjArr = Object.keys(roleObj)
      if (roleObjArr.length === 1) {
        const updateRole = {
          state: roleObj.state
        }
        await RolesService.updateRole(roleId, updateRole)
        ctx.body = {
          status: 200,
          msg: '角色状态修改成功',
          data: null
        }
      } else {
        const updateRole = {
          name: roleObj.name,
          description: roleObj.description,
          state: roleObj.state
        }
        await RolesService.updateRole(roleId, updateRole)
        ctx.body = {
          status: 200,
          msg: '角色信息修改成功',
          data: null
        }
      }
    }
    
  },
  deleteRole: async ctx => {
    const roleId = ctx.request.path.substring(20)
    const result = await RolesService.getRoleDetail(roleId)
    if (result.dataValues.id === '1') {
      ctx.body = {
        status: 1000,
        msg: '超级管理员不可被删除',
        data: null
      }
    } else {
      await RolesService.deleteRole(roleId)
      ctx.status = 200
      ctx.body = {
        status: 200,
        msg: '角色删除成功',
        data: null
      }
    }
  },

// 角色权限控制
  getMenuList: async ctx => {
    const result = await RolesService.getMenuList()
    if (result.length > 0) {
      ctx.body = {
        status: 200,
        msg: 'ok',
        data: {
          menu_list: result
        }
      }
    }
  },
  getRoleMenuList: async ctx => {
    const roleId = ctx.url.substring(19)
    const result = await RolesService.getRoleMenuList(roleId)
    if (result.length > 0) {
      ctx.body = {
        status: 200,
        msg: 'ok',
        data: {
          roleMenuList: result
        }
      }
    } else {
      ctx.body = {
        status: 404,
        msg: 'error',
        data: null
      }
    }
  },
//  获取角色权限
  getRolePermission: async ctx => {
    const roleName = ctx.url.substring(30)
    const result = await RolesService.getRolePermission(roleName)
    if (result.length > 0) {
      ctx.body = {
        status: 200,
        msg: 'ok',
        data: {
          permissionList: result
        }
      }
    } else {
      ctx.body = {
        status: 2000,
        msg: '该角色还没有权限',
        data: null
      }
    }
  },
//  获取所有权限
  getPermission: async ctx => {
    const result = await RolesService.getPermission()
    const permissionList = []
    for (let i = 0; i < result.length; i++) {
      const tmp = result[i].dataValues
      tmp.title = tmp.description
      delete tmp.description
      permissionList.push(tmp)
    }
    ctx.body = {
      status: 200,
      msg: '获取权限列表成功',
      data: {
        permissionList: permissionList
      }
    }
  },
//  更新菜单权限
  updateRoleMenuList: async ctx => {
    const roleId = ctx.request.path.substring(19)
    const roleMenuIdList = ctx.request.body
    const roleMenuList = []
    for (let i = 0; i < roleMenuIdList.length; i++) {
      let tmp = {
        awRoleId: roleId,
        awMenuListId: roleMenuIdList[i]
      }
      roleMenuList.push(tmp)
    }
    const result = await RolesService.updateRoleMenuList(roleId, roleMenuList)
    if (result){
      ctx.status=200
      ctx.body={
        status:200,
        msg:'更新角色菜单权限成功'
      }
    }else {
      ctx.status=404
      ctx.body={
        status:404,
        msg:'更新角色菜单权限失败'
      }
    }
  },
//  更新角色操作权限
  updateRolePermissionList:async ctx=>{
    const roleId = ctx.request.path.substring(25)
    const permissionIdList = ctx.request.body
    const rolePermissionList = []
    for (let i = 0; i < permissionIdList.length; i++) {
      let tmp = {
        awRoleId: roleId,
        awPermissionId: permissionIdList[i]
      }
      rolePermissionList.push(tmp)
    }
    // console.log(rolePermissionList)
    const result = await RolesService.updateRolePermissionList(roleId, rolePermissionList)
    if (result){
      ctx.status=200
      ctx.body={
        status:200,
        msg:'更新角色操作权限成功'
      }
    }else {
      ctx.status=404
      ctx.body={
        status:404,
        msg:'更新角色操作权限失败'
      }
    }
  }
}
