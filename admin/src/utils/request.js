import axios from 'axios'
import { MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials:true，跨域请求时发送cookies
  timeout: 5000 // 请求超时
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么

    if (store.getters.token) {
      // 让每个请求携带token
      // ['X-Token']是一个自定义头密钥
      // 请根据实际情况修改
      // config.headers['X-Token'] = getToken()
      config.headers.Authorization = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    // 处理请求错误
    console.log(error) // 用于调试
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * 如果想获取http信息，如标头或状态
   * 请 return  response => response
   */

  /**
   * 通过自定义状态确定请求状态
   * 这里只是一个例子
   * 您还可以通过HTTP状态来判断状态
   */
  response => {
    const res = response
    // 如果自定义状态不是200，则判断为错误。
    if (res.status !== 200) {
      // Message({
      //   message: res.message || 'Error',
      //   type: 'error',
      //   duration: 5 * 1000
      // })

      // 50008:非法token；50012:其他客户端登录；50014:token过期；
      if (res.status === 50008 || res.status === 50012 || res.status === 50014) {
        // to re-login
        MessageBox.confirm('您已注销，可以取消以停留在此页面，或重新登录', '确认注销', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }

      return Promise.reject(new Error(res.data.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
