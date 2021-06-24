import request from '@/utils/request'

export function login(data) {
  return request({
    // url: '/vue-admin-template/account/login',
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/admin/info',
    method: 'get'
    // params: { token }
  })
}

export function getInfoById(id) {
  return request({
    url: `/admin/info/${id}`,
    method: 'get'
    // params: { token }
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}

export function getAccountList(query) {
  return request({
    url: '/admin/account',
    method: 'get',
    params: query
  })
}

export function getAccountListDate() {
  return request({
    url: '/admin/account/date',
    method: 'get'
  })
}

export function updateAccount(id, data) {
  return request({
    url: `/admin/account/${id}`,
    method: 'put',
    data
  })
}

export function deleteAccount(id) {
  return request({
    url: `/admin/account/${id}`,
    method: 'delete'
  })
}

export function addAccount(data) {
  return request({
    url: `/admin/account`,
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: `/admin/register`,
    method: 'post',
    data
  })
}
