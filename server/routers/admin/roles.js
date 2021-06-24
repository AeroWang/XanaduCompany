/**
 * @Description:
 * @author Aerowang
 * @date 2021/5/27
 */
const Router = require('koa-router')
const router = new Router()
const role = require('../../controllers/admin/role/rolesController')
const routers = router
  .get('/roles',role.getRolesList)
  .get('/roles/:id',role.getRoleDetail)
  .post('/roles',role.addRole)
  .put('/roles/:id',role.updateRole)
  .delete('/roles/:id',role.deleteRole)
  .get('/permission',role.getPermission)
  .get('/role/permission/:id',role.getRolePermission)
  .put('/permission/:id',role.updateRolePermissionList)
  .get('/menu',role.getMenuList)
  .get('/menu/:id',role.getRoleMenuList)
  .put('/menu/:id',role.updateRoleMenuList)
module.exports = routers
