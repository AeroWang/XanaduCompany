const Router = require('koa-router')
const router = new Router({
  prefix: '/api/v1',
})

const web = require('./web/webapi')
const admin = require('./admin/admin')

router.use('/web', web.routes(), web.allowedMethods())
router.use('/admin', admin.routes(), admin.allowedMethods())

module.exports = router
