import request from '@/utils/request'

/**
 * 获取产品列表
 * @returns
 */
export const getProductLit = () => {
  return request.get('/v1/web/products')
}
