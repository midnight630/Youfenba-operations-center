import Request from 'src/utils/Request'
/**
 *
 * @desc 获取登录信息
 * @link https://www.tapd.cn/53900879/markdown_wikis/#1153900879001000294
 *
 * @method GET
 *
 * @return {Promise} 请求返回
 */
export const getMe = () => {
  return Request({
    url: '/api/v1/me'
  })
}

/**
 *
 * @desc 获取全局信息
 * @link
 *
 * @method GET
 *
 * @return {Promise} 请求返回
 */
export const getGlobal = () => {
  return Request({
    url: '/api/qiniu/global',
    headers: {
      noMsg: true
    }
  })
}

/**
 *
 * @desc 注册来源
 * @link
 *
 * @method get
 *
 * @return {Promise} 请求返回
 */

export const getRegistrationSource = () => {
  return Request({
    url: `/api/v1/register_from`,
    method: 'get'
  })
}

/**
 *
 * @desc 注册渠道
 * @link
 *
 * @method get
 *
 * @return {Promise} 请求返回
 */

export const getRegistrationChannel = (data?: any) => {
  return Request({
    url: `/api/v1/customer_source_id`,
    method: 'get',
    params: data
  })
}

/**
 *
 * @desc 获取媒体主
 * @link
 *
 * @method GET
 *
 * @return {Promise} 请求返回
 */

export const getMediaList = (data: any) => {
  return Request({
    url: '/api/v1/media',
    method: 'get',
    params: data
  })
}

/**
 *
 * @desc 获取广告主
 * @link
 *
 * @method GET
 *
 * @return {Promise} 请求返回
 */

export const getAdList = (data: any) => {
  return Request({
    url: '/api/v1/brand',
    method: 'get',
    params: data
  })
}

/**
 *
 * @desc 获取BD
 * @link
 *
 * @method GET
 *
 * @return {Promise} 请求返回
 */

export const getBD = () => {
  return Request({
    url: '/api/v1/media_bd_id',
    method: 'get'
  })
}

/**
 *
 * @desc 获取BD
 * @link
 *
 * @method GET
 *
 * @return {Promise} 请求返回
 */

export const getOperate = () => {
  return Request({
    url: '/api/v1/media_operator_id',
    method: 'get'
  })
}

/**
 *
 * @desc 验单员
 * @link https://www.tapd.cn/53900879/markdown_wikis/view/#1153900879001001214
 *
 * @method GET
 *
 * @return {Promise} 请求返回
 */

export const getInspector = () => {
  return Request({
    url: `/api/v1/inspector_id`,
    method: 'get'
  })
}

/**
 *
 * @desc 授信
 * @link
 *
 * @method POST
 *
 * @return {Promise} 请求返回
 */

export const postCredit = (data: any) => {
  return Request({
    url: `/api/v1/customer/credit/${data.customer_id}`,
    method: 'post',
    data: data
  })
}

/**
 *
 * @desc 指定运营
 * @link
 *
 * @method PUT
 *
 * @return {Promise} 请求返回
 */

export const putOperate = (data: any) => {
  return Request({
    url: `/api/v1/media/operator/${data.customer_id}/${data.id}`,
    method: 'put'
  })
}

/**
 *
 * @desc 指定bd
 * @link
 *
 * @method PUT
 *
 * @return {Promise} 请求返回
 */

export const putBd = (data: any) => {
  return Request({
    url: `/api/v1/media/bd/${data.customer_id}/${data.id}`,
    method: 'put'
  })
}

/**
 *
 * @desc 指定商务
 * @link
 *
 * @method PUT
 *
 * @return {Promise} 请求返回
 */

export const putBusiness = (data: any) => {
  return Request({
    url: `/api/v1/brand/bd/${data.customer_id}/${data.id}`,
    method: 'put'
  })
}

/**
 *
 * @desc 指定投放经理
 * @link
 *
 * @method PUT
 *
 * @return {Promise} 请求返回
 */

export const putManager = (data: any) => {
  return Request({
    url: `/api/v1/brand/pm/${data.customer_id}/${data.id}`,
    method: 'put'
  })
}

/**
 *
 * @desc 添加客户
 * @link
 *
 * @method POST
 *
 * @return {Promise} 请求返回
 */

export const postAddUser = (data: any) => {
  return Request({
    url: `/api/v1/customer`,
    method: 'post',
    data: data
  })
}

/**
 *
 * @desc 限登
 * @link
 *
 * @method put
 *
 * @return {Promise} 请求返回
 */

export const putLimitLogin = (data: any) => {
  return Request({
    url: `/api/v1/customer/status/${data.customer_id}/${data.status}`,
    method: 'put',
    data: data
  })
}

/**
 *
 * @desc 充值
 * @link
 *
 * @method post
 *
 * @return {Promise} 请求返回
 */

export const postChargeMoney = (data: any) => {
  return Request({
    url: `/api/v1/customer/recharge/${data.customer_id}`,
    method: 'post',
    data: data
  })
}

/**
 *
 * @desc 媒体主信息
 * @link
 *
 * @method get
 *
 * @return {Promise} 请求返回
 */

export const getMediaInfo = (data: any) => {
  return Request({
    url: `/api/v1/media/${data.customer_id}`,
    method: 'get'
  })
}

/**
 *
 * @desc 广告主信息
 * @link
 *
 * @method get
 *
 * @return {Promise} 请求返回
 */

export const getAdInfo = (data: any) => {
  return Request({
    url: `/api/v1/brand/${data.customer_id}`,
    method: 'get'
  })
}

/**
 *
 * @desc 客户主信息
 * @link
 *
 * @method get
 *
 * @return {Promise} 请求返回
 */

export const getCustomerInfo = (data: any) => {
  return Request({
    url: `/api/v1/customer/${data.customer_id}`,
    method: 'get'
  })
}

/**
 *
 * @desc 拉黑公众号列表
 * @link
 *
 * @method get
 *
 * @return {Promise} 请求返回
 */

export const getPullBlackMp = (data: any) => {
  return Request({
    url: `/api/v1/brand/black_mp/${data.customer_id}`,
    method: 'get',
    params: data
  })
}

/**
 *
 * @desc 广告主投放经理
 * @link
 *
 * @method get
 *
 * @return {Promise} 请求返回
 */

export const getManager = () => {
  return Request({
    url: `/api/v1/brand_pm_id`,
    method: 'get'
  })
}

/**
 *
 * @desc 广告主商务
 * @link
 *
 * @method get
 *
 * @return {Promise} 请求返回
 */

export const getBusiness = () => {
  return Request({
    url: `/api/v1/brand_bd_id`,
    method: 'get'
  })
}

/**
 *
 * @desc 媒体主-黑名单
 * @link
 *
 * @method get
 *
 * @return {Promise} 请求返回
 */

export const getBlackList = (data: any) => {
  return Request({
    url: `/api/v1/black_media`,
    method: 'get',
    params: data
  })
}

/**
 *
 * @desc 媒体主-拉黑or移除拉黑
 * @link
 *
 * @method put
 *
 * @return {Promise} 请求返回
 */

export const getPullCancleBlack = (data: any) => {
  return Request({
    url: `/api/v1/media/black_status/${data.media_id}/${data.status}`,
    method: 'put'
  })
}
