import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
const instance = axios.create({
  // baseURL: '/api/v1', // 开发模式下
  // baseURL: 'https://xanadu.aerowang.cn/api/v1', // 线上模式
  baseURL: process.env.VUE_APP_BASEURL,
  // baseURL: 'http://123.56.124.33:3000/api/',
  // baseURL: 'https://www.fastmock.site/mock/c189d5ce3b7cb372ce6f287aa8bc6238/api',
  // 请求超时时间
  timeout: 10000
})

instance.interceptors.request.use((config:AxiosRequestConfig) => {
  // console.log(config)
    config.headers?.common?.set('Authorization', window.sessionStorage.getItem('token'))
    //   config?.headers?.Authorization = 'Bearer ' + window.sessionStorage.getItem('token')
    return config
})

export default instance
