const {
  Role,
  RoleMenuList,
  MenuList
} = require('../../../models/index')

class RoutesService {
  async getRoleInfo (role) {
    return Role.findAll({
      where: {
        name: role
      }
    })
    // const menu_list_id=await MenuList.findAll({
    //   where:{
    //     aw_role_id:roleId
    //   }
    // })
    // console.log(menu_list_id)
  }
  
  async getRoleMenuId (roleId) {
    return RoleMenuList.findAll({
      where: {
        aw_role_id: roleId
      }
    })
  }
  
  async getRoutes (menuId) {
    return MenuList.findAll({
      where: {
        id: menuId
      },
      attributes: { exclude: ['id','createdAt','updatedAt','parent_id'] },
    })
  }
}

module.exports = new RoutesService()
