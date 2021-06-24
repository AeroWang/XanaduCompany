const ProductService = require('../services/productService')
module.exports = {
  productList: async (ctx) => {
    const result = await ProductService.getProducts()
    if (result.length > 0) {
      const productList = []
      for (let i = 0; i < result.length; i++) {
        const data = result[i].dataValues
        productList.push(data)
      }
      ctx.body = {
        status: 200,
        msg: '获取成功',
        data: { list: productList }
      }
    } else {
      ctx.body = {
        status: 'error',
        msg: '获取失败',
        data: null
      }
    }
  }
}
