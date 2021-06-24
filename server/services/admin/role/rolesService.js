/**
 * @Description:
 * @author Aerowang
 * @date 2021/5/27
 */
const {
  Role,
  RolePermission,
  Permission,
  MenuList,
  RoleMenuList
} = require('../../../models/index')

class rolesService {
  async getRolesList () {
    return Role.findAll()
  }
  
  async getRoleDetail (id) {
    return Role.findOne({
      where: {
        id: id
      }
    })
  }
  
  async addRole (params) {
    return Role.create(params)
  }
  
  async updateRole (id, value) {
    await Role.update(value, {
      where: {
        id: id
      }
    })
  }
  
  async deleteRole (id) {
    await Role.destroy({
      where: {
        id: id
      }
    })
  }
  
  // 角色权限服务
  async getPermission () {
    return await Permission.findAll({
      attributes: ['id', 'path', 'description', 'state']
    })
  }
  
  async getMenuList () {
    return await MenuList.findAll()
  }
  
  async getRoleMenuList (roleId) {
    const result = await RoleMenuList.findAll({
      where: {
        aw_role_id: roleId
      }
    })
    const menuIdList = []
    for (let i = 0; i < result.length; i++) {
      const tmp = result[i].dataValues.awMenuListId
      menuIdList.push(tmp)
    }
    const menuList = []
    for (let i = 0; i < menuIdList.length; i++) {
      const menuId = menuIdList[i]
      const tmp = await Permission.findOne({
        where: {
          id: menuId
        }
      })
      menuList.push(tmp.dataValues)
    }
    return menuList
  }
  
  async getRolePermission (roleName) {
    const { id: roleId } = await Role.findOne({
      where: {
        name: roleName
      },
      attributes: ['id']
    })
    // 查询权限ID列表
    const result1 = await RolePermission.findAll({
      where: {
        aw_role_id: roleId
      }
    })
    const permissionIdList = []
    if (result1.length > 0) {
      for (let i = 0; i < result1.length; i++) {
        const tmp = result1[i].dataValues.awPermissionId
        permissionIdList.push(tmp)
      }
    }
    // 查询角色权限列表
    const result2 = []
    for (let i = 0; i < permissionIdList.length; i++) {
      const permissionId = permissionIdList[i]
      const tmp = await Permission.findOne({
        where: {
          id: permissionId
        }
      })
      result2.push(tmp.dataValues)
    }
    return result2
  }
  
  async updateRoleMenuList (roleId, value) {
    
    await RoleMenuList.destroy({
      where: {
        aw_role_id: roleId
      }
    })
    for (let i = 0; i < value.length; i++) {
      await RoleMenuList.create(value[i])
    }
    return true
  }
  
  async updateRolePermissionList(roleId,value){
    await RolePermission.destroy({
      where: {
        aw_role_id: roleId
      }
    })
    for (let i = 0; i < value.length; i++) {
      await RolePermission.create(value[i])
    }
    return true
  }
}

module.exports = new rolesService()
