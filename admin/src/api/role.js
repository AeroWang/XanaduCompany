import request from '@/utils/request'

export function getAsyncRoutes() {
  return request({
    url: '/admin/routes',
    method: 'get'
  })
}

export function getRolesList() {
  return request({
    url: '/admin/roles',
    method: 'get'
  })
}

export function getRoleDetail(id) {
  return request({
    url: `/admin/roles/${id}`,
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/admin/roles',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/admin/roles/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/admin/roles/${id}`,
    method: 'delete'
  })
}

export function getPermission() {
  return request({
    url: '/admin/permission',
    method: 'get'
  })
}

export function updateRolePermissionList(id, data) {
  return request({
    url: `/admin/permission/${id}`,
    method: 'put',
    data
  })
}

export function getRolePermission(roleName) {
  return request({
    url: `/admin/role/permission/${roleName}`,
    method: 'get'
  })
}

export function getMenuList() {
  return request({
    url: `/admin/menu`,
    method: 'get'
  })
}

export function getRoleMenuList(id) {
  return request({
    url: `/admin/menu/${id}`,
    method: 'get'
  })
}

export function updateRoleMenuList(id, data) {
  return request({
    url: `/admin/menu/${id}`,
    method: 'put',
    data
  })
}

