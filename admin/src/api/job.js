/**
 * @Description:
 * @author Aerowang
 * @date 2021/5/29
 */
import request from '@/utils/request'

export function getJobCategory() {
  return request({
    url: '/admin/job_category',
    method: 'get'
  })
}

export function getCity() {
  return request({
    url: '/admin/city',
    method: 'get'
  })
}

export function addJob(data) {
  return request({
    url: '/admin/job',
    method: 'post',
    data
  })
}

export function getJobList(query) {
  return request({
    url: '/admin/job',
    method: 'get',
    params: query
  })
}
export function getJobDetail(id) {
  return request({
    url: `/admin/job/${id}`,
    method: 'get'
  })
}

export function updateJob(id, data) {
  return request({
    url: `/admin/job/${id}`,
    method: 'put',
    data
  })
}
export function deleteJob(id) {
  return request({
    url: `/admin/job/${id}`,
    method: 'delete'
  })
}
