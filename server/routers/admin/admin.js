const Router = require('koa-router')
const router = new Router()

const user = require('./user')
// 权限路由菜单
const Routes = require('./routes')
const upload = require('./upload')
const article = require('./article')
const role = require('./roles')
const job = require('./job')
const product = require('./product')

router.use(user.routes(), user.allowedMethods())
router.use(Routes.routes(), Routes.allowedMethods())
router.use(upload.routes(), upload.allowedMethods())
router.use(article.routes(), article.allowedMethods())
router.use(role.routes(), role.allowedMethods())
router.use(job.routes(), job.allowedMethods())
router.use(product.routes(), product.allowedMethods())

module.exports = router
