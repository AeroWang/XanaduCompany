/**
 * @Description:
 * @author Aerowang
 * @date 2021/5/29
 */
const ProductService = require('../../services/admin/productService')
module.exports = {
  addProduct: async ctx => {
    const data = ctx.request.body
    const product = {
      product_title: data.title,
      product_desc: data.description,
      product_sub_desc: data.subDescription,
      product_link: data.link,
      cover_img: data.bgImg,
      product_logo: data.logo,
    }
    const temp = Object.values(product)
    if (temp.indexOf(undefined) !== -1) {
      ctx.body = {
        status: 'error',
        msg: '发布产品失败',
        data: null
      }
    } else {
      await ProductService.addProduct(product)
      ctx.body = {
        status: 200,
        msg: '发布产品成功',
        data: null
      }
    }
  },
  deleteProduct: async ctx => {
    const deleteId = ctx.url.substring(22)
    const result = await ProductService.deleteProduct(deleteId)
    if (result === 1) {
      ctx.body = {
        status: 200,
        msg: '删除该产品成功',
        data: null
      }
    } else {
      ctx.body = {
        status: 'error',
        msg: '删除该产品失败',
        data: null
      }
    }
  },
  updateProduct: async ctx => {
    const productId = ctx.url.substring(22)
    const tempObj = ctx.request.body
    const productObj = {
      product_title: tempObj.title,
      product_desc: tempObj.description,
      product_sub_desc: tempObj.subDescription,
      product_link: tempObj.link,
      cover_img: tempObj.bgImg,
      product_logo: tempObj.logo,
    }
    const result = await ProductService.updateProduct(productId, productObj)
    if (result[0] === 1) {
      ctx.body = {
        status: 200,
        msg: '产品信息修改成功',
        data: null
      }
    } else {
      ctx.body = {
        status: 'error',
        msg: '产品信息修改失败',
        data: null
      }
    }
  },
  getProductList: async ctx => {
    const {
      count,
      rows
    } = await ProductService.getProductList()
    if (count > 0) {
      const productList = []
      for (let i = 0; i < rows.length; i++) {
        const data = rows[i].dataValues
        const productObj = {
          id: data.id,
          title: data.product_title,
          description: data.product_desc,
          subDescription: data.product_sub_desc,
          link: data.product_link,
          bgImg: data.cover_img,
          logo: data.product_logo
        }
        productList.push(productObj)
      }
      ctx.body = {
        status: 200,
        msg: '获取成功',
        data: {
          list: productList,
          total: count
        }
      }
    }
  },
  getProductDetail: async ctx => {
    const productId = ctx.url.substring(22)
    const result = await ProductService.getProductDetail(productId)
    if (result) {
      ctx.body = {
        status: 200,
        msg: '获取产品信息成功',
        data: result.dataValues
      }
    } else {
      ctx.body = {
        status: 'error',
        msg: '获取产品信息失败',
        data: null
      }
    }
  }
}
