import request from '@/utils/request'

export function uploadFile(data) {
  return request({
    url: '/admin/file',
    method: 'post',
    header: { 'Content-Type': 'multipart/form-data' },
    data
  })
}

export function deleteFile(url) {
  return request({
    url: `/admin/file/${url}`,
    method: 'delete'
  })
}

