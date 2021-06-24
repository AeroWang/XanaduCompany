/**
 * @Description:
 * @author Aerowang
 * @date 2021/5/29
 */
const Router = require('koa-router')
const router = new Router()
const product = require('../../controllers/admin/productController')
const routers = router
  .post('/product', product.addProduct)
  .get('/product', product.getProductList)
  .get('/product/:id', product.getProductDetail)
  .delete('/product/:id', product.deleteProduct)
  .put('/product/:id', product.updateProduct)
module.exports = routers
