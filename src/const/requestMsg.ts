const requestMsg: any = {
  201: '创建或修改成功',
  400: '请求业务出错',
  401: '认证失败，token无效',
  403: '此操作未经授权',
  405: '请求方法不正确',
  404: '请求不存在',
  422: '请求参数错误',
  500: '服务繁忙',
  default: '未知错误'
}

export default requestMsg
