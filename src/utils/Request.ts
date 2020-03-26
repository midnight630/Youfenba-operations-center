/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios'
import { isDev } from './util'
import { message } from 'antd'
import requestMsg from 'src/const/requestMsg'
import { getTokenStorage } from 'src/utils/util'

// 环境的切换
if (isDev) {
  axios.defaults.baseURL = '/'
} else {
  axios.defaults.baseURL = '/'
}

// 请求超时时间
const instance = axios.create({
  timeout: 10000
})

// 请求拦截器
instance.interceptors.request.use(
  async config => {
    const noToken = (config.headers || {}).noToken === false
    const token = getTokenStorage()
    if (token && !noToken) {
      config.headers['Authorization'] = 'Bearer ' + token // token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    if (
      !!response.config.headers.noMsg === false &&
      response.data.code === 201
    ) {
      message.success(response.data.message || requestMsg[201])
    }

    return Promise.resolve(response)
  },
  // 服务器状态码不是200的情况
  error => {
    const response = error.response
    if (response && response.status) {
      switch (response.status) {
        // 401: 未登录
        case 401:
          window.location.href = '/login'
          break
        // 其他错误，直接抛出错误提示
        default:
          if (response.status >= 500 && response.status <= 599) {
            message.error(requestMsg['500'])
          } else {
            message.error(
              error.response.data.message ||
                requestMsg[response.status] ||
                requestMsg['default']
            )
          }
          break
      }
    }
    return Promise.reject(error)
  }
)

export default instance
