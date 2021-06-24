const Router = require('koa-router')
const router = new Router()
const routes = require('../../controllers/admin/role/routesController')
const routers = router
  .get('/routes',routes.routes)
module.exports = routers
