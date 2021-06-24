/**
 * @Description:
 * @author Aerowang
 * @date 2021/5/29
 */
const {
  Products
} = require('../../models/index')

class productService {
  async addProduct (data) {
    return Products.create(data)
  }
  
  async deleteProduct (id) {
    return Products.destroy({
      where: {
        id: id
      }
    })
  }
  
  async updateProduct (id, value) {
    return Products.update(value, {
      where: {
        id: id
      }
    })
  }
  
  async getProductList () {
    return Products.findAndCountAll()
  }
  
  async getProductDetail (id) {
    return Products.findOne({
      where: {
        id: id
      }
    })
  }
}

module.exports = new productService()
