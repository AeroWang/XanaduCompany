import request from '@/utils/request'

export function getArticleList(query) {
  return request({
    url: '/admin/article',
    method: 'get',
    params: query
  })
}

export function createArticle(data) {
  return request({
    url: '/admin/article',
    method: 'post',
    // header: { 'Content-Type': 'multipart/form-data' },
    data
  })
}

export function updateArticle(path, data) {
  return request({
    url: `/admin/article/${path}`,
    method: 'put',
    data
  })
}
export function deleteArticle(path) {
  return request({
    url: `/admin/article/${path}`,
    method: 'delete'
  })
}

export function getCategory() {
  return request({
    url: '/admin/article_category',
    method: 'get'
  })
}

export function getArticleDetail(query) {
  return request({
    url: `/admin/article/${query}`,
    method: 'get'
  })
}
