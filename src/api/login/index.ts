import Request from 'src/utils/Request'
/**
 *
 * @desc 获取验证码信息
 * @link https://www.tapd.cn/53900879/markdown_wikis/#1153900879001000290
 *
 * @method GET
 *
 * @return {Promise} 请求返回
 */
export const getCaptcha = () => {
  return Request({
    url: '/api/v1/captcha'
  })
}
// 登录请求参数
export interface ILoginParams {
  username: string
  password: string
  captcha: string
  captcha_id: string
}
/**
 *
 * @desc 登录接口
 * @link https://www.tapd.cn/53900879/markdown_wikis/#1153900879001000295
 *
 * @method POST
 * @param {ILoginParams} params 登录请求参数
 *  {
 *    username,
 *    password,
 *    captcha,
 *    captcha_id
 * }
 *
 * @return {Promise} 请求返回
 *
 */
export const postLogin = (params: ILoginParams) => {
  return Request({
    url: '/api/v1/login',
    method: 'post',
    data: params
  })
}

/**
 *
 * @desc 用户登出
 * @link https://www.tapd.cn/53900879/markdown_wikis/#1153900879001000296
 *
 * @method GET
 *
 * @return {Promise} 请求返回
 *
 */
export const getLogout = () => {
  return Request({
    url: '/api/v1/logout',
    method: 'post'
  })
}

/**
 * @desc 获取登录的二维码
 * @link https://www.tapd.cn/53900879/markdown_wikis/?#1153900879001000415
 *
 * @method GET
 *
 * @return {Promise} 请求返回
 *
 */
export const getQrCode = () => {
  return Request({
    url: '/api/v1/qr_code/0'
  })
}
