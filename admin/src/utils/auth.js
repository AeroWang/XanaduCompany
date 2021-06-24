const TokenKey = 'token'

export function getToken() {
  return window.sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
  // 1、保存 token 到 sessionStorage 中
  return window.sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return window.sessionStorage.removeItem(TokenKey)
}
