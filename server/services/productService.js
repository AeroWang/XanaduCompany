const { Products } = require('../models/index')

class ProductService {
  async getProducts () {
    return Products.findAll({
        attributes: { exclude: ['create_time', 'update_time'] }
      }
    )
  }
}

module.exports = new ProductService()
