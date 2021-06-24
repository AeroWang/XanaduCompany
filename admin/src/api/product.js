/**
 * @Description:
 * @author Aerowang
 * @date 2021/5/29
 */
import request from '@/utils/request'

export function addProduct(data) {
  return request({
    url: '/admin/product',
    method: 'post',
    data
  })
}
export function updateProduct(id, data) {
  return request({
    url: `/admin/product/${id}`,
    method: 'put',
    data
  })
}
export function deleteProduct(id) {
  return request({
    url: `/admin/product/${id}`,
    method: 'delete'
  })
}
export function getProductList() {
  return request({
    url: '/admin/product',
    method: 'get'
  })
}
export function getProductDetail(id) {
  return request({
    url: `/admin/product/${id}`,
    method: 'get'
  })
}
