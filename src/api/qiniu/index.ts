import Request from 'src/utils/Request'
/**
 *
 * @desc 获取七牛上传的token
 * @link
 *
 * @method GET
 *
 * @return {Promise} 请求返回
 */
export const getQiniuToken = () => {
  return Request({
    url: '/api/qiniu/token'
  })
}
