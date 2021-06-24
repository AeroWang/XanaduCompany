import axios from 'axios'

const instance = axios.create({
  // baseURL: '/api/v1', // 开发模式下
  baseURL: 'https://xanadu.aerowang.cn/api/v1', // 线上模式
  // baseURL: 'http://localhost:3000/api/v1',
  // 请求超时时间
  timeout: 10000
})

instance.interceptors.request.use(config => {
  // console.log(config)
  config.headers.Authorization = 'Bearer ' + window.sessionStorage.getItem('token')
  return config
})

export default instance
