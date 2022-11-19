import request from '@/utils/request'
/**
 * 搜索新闻
 * @param queryString
 * @returns
 */
export const searchNews = (queryString: string) => {
  return request.get('/v1/web/searchnews/' + queryString)
}

/**
 * 获取新闻列表
 * @param data
 * @returns
 */
export const getNewsList = (data: any) => {
  return request.get('/v1/web/newslist', { params: data })
}

/**
 * 获得推荐的新闻
 * @returns
 */
export const getRecomNewsApi = () => {
  return request.get('/v1/web/recomNews')
}

/**
 * 获取新闻详情
 * @param path
 * @returns
 */
export const getNewsDetailsApi = (path:string) => {
  return request.get('/v1/web/article/' + path)
}

export const getHotNewsApi = () => {
  return request.get('/v1/web/hotnews')
}
