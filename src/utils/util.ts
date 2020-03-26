import { tokenStorageKey } from 'src/const'
import moment from 'moment'

export const isDev = () => {
  if (process.env.NODE_ENV === 'development') {
    return true
  }

  return false
}

/**
 * @desc 把对应的键值对存储在localStorage中
 * @param {string} key 键
 * @param {string} value 值
 */
export const setStorage = (key: string, value: string) => {
  localStorage.setItem(key, value)
}

/**
 * @desc 从localStorage中获取key对应对值
 * @param {string} key 键
 *
 * @return {string} key 对应的值
 */
export const getStorage = (key: string) => {
  return localStorage.getItem(key)
}

/**
 * @desc 从localStorage中获取key对应对值
 * @param {string} key 键
 *
 * @return {string} key 对应的值
 */
export const removeStorage = (key: string) => {
  return localStorage.removeItem(key)
}

/**
 * @desc 设置token 存放在localStorage中
 * @param {string} value token
 */
export const setTokenStorage = (value: string) => {
  setStorage(tokenStorageKey, value)
}
/**
 * @desc 从localStorage中取token
 *
 * @return {string} token
 */
export const getTokenStorage = () => {
  return getStorage(tokenStorageKey)
}

/**
 * @desc 从localStorage中取token
 *
 * @return {string} token
 */
export const removeTokenStorage = () => {
  removeStorage(tokenStorageKey)
}

/**
 * 格式化金额
 * @param {number | string} value 金额值 （单位分）
 * @param {boolean} isCurrency 是否带前缀 默认true
 *
 * @return {number | string} 返回格式化后的金额
 */
export const getPrice = (value: any, isCurrency: boolean = true) => {
  if (isCurrency) return `${'¥ '}${(parseInt(value) / 100).toFixed(2)}`
  return parseInt(value) / 100
}

/**
 * 获取url中的参数
 *
 * @param {string} url url
 * @param {string} name 参数名
 *
 * @return {string | null}  如果url存在name参数返回对应值，否则返回null
 *
 */
export const getUrlParam = (url: string, name: string) => {
  if (!name) {
    return null
  }
  name = name.replace(/(?=[\\^$*+?.():|{}])/, '\\')
  const reg = new RegExp('(?:[?&]|^)' + name + '=([^?&#]*)', 'i')
  const match = url.match(reg)
  return !match ? null : match[1]
}

/**
 * get对象转化为url参数
 * @param {*} data
 * @param {*} isPrefix
 */
export const queryParams = (data: any, isPrefix: boolean = true) => {
  let prefix = isPrefix ? '?' : ''
  let _result = []
  // if (JSON.stringify(data) === '{}') return
  for (let key in data) {
    let value = data[key]
    // 去掉为空的参数
    if (['', undefined, null].includes(value)) {
      continue
    }
    if (value.constructor === Array) {
      value.forEach((_value: any) => {
        _result.push(
          encodeURIComponent(key) + '[]=' + encodeURIComponent(_value)
        )
      })
    } else {
      _result.push(encodeURIComponent(key) + '=' + encodeURIComponent(value))
    }
  }

  return _result.length ? prefix + _result.join('&') : ''
}

/**
 * 判断浏览器所在系统
 *
 * @return {Boolean} mac 系统返回 true
 */
export const isMac = () => {
  const UserAgent = navigator.userAgent.toLowerCase()
  return /mac os/.test(UserAgent)
}

/**
 * 获取url的参数(将url参数转换成对象)
 * @return {object} 返回数据的格式
 */
export const queryString = () => {
  let _queryString: any = {}
  const _query = window.location.search.substr(1)
  const _vars = _query.split('&')
  _vars.forEach((v, i) => {
    const _pair = v.split('=')
    if (!_queryString.hasOwnProperty(_pair[0])) {
      _queryString[_pair[0]] = decodeURIComponent(_pair[1])
    } else if (typeof _queryString[_pair[0]] === 'string') {
      const _arr = [_queryString[_pair[0]], decodeURIComponent(_pair[1])]
      _queryString[_pair[0]] = _arr
    } else {
      _queryString[_pair[0]].push(decodeURIComponent(_pair[1]))
    }
  })
  return _queryString
}

/**
 * 获取近N天日期（包括今日，向前推）
 *
 * @param {number} num 近N天
 * @return {array} 返回数据的格式区间[开始日期,结束日期]
 */
export const getDate = (num: number) => {
  //获取当前日期
  let result = null
  let myDate: any = new Date()
  let nowY = myDate.getFullYear()
  let nowM = myDate.getMonth() + 1
  let nowD = myDate.getDate()
  let enddate =
    nowY +
    '-' +
    (nowM < 10 ? '0' + nowM : nowM) +
    '-' +
    (nowD < 10 ? '0' + nowD : nowD) //当前日期
  //返回近n天日期（区间）
  if (num > 0) {
    let n = num - 1 //最后一个数字30可改，30天的意思
    let lw = new Date(myDate - 1000 * 60 * 60 * 24 * n)
    let lastY = lw.getFullYear()
    let lastM = lw.getMonth() + 1
    let lastD = lw.getDate()
    let startdate =
      lastY +
      '-' +
      (lastM < 10 ? '0' + lastM : lastM) +
      '-' +
      (lastD < 10 ? '0' + lastD : lastD) //n天之前日期
    return [moment(startdate), moment(enddate)]
  } else if (num < 0) {
    //转化特殊日期例（昨日）
    result = singleDate(String(num))
    return [moment(result), moment(result)]
  } else {
    result = enddate
    return [moment(result), moment(result)]
  }
}

/**
 * 获取特殊日期例（昨日，后天...）
 *
 * @param {string} AddDayCount 例如昨天：-1，明天：1，后天：2
 * @return {string} 返回yyyy-mm-dd
 */
export const singleDate = (AddDayCount: string) => {
  var days = parseInt(AddDayCount, 10)
  var dd = new Date()
  dd.setDate(dd.getDate() + days) //获取AddDayCount天后的日期
  var y = dd.getFullYear()
  var m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 //获取当前月份的日期，不足10补0
  var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() //获取当前几号，不足10补0
  return y + '-' + m + '-' + d
}

/**
 * 数组中是否重复
 *
 * @param {array} arr 传入数组
 * @return {boolean} 返回是否重复结果
 */
export const isRepeat = (arr: any[]) => {
  let hash: any = {}
  for (var i in arr) {
    if (hash[arr[i]]) return true
    hash[arr[i]] = true
  }
  return false
}

/**
 * 清空格
 *
 * @param {string} str 传入字符串
 * @return {string} 返回清除完空格的字符串
 */
export const trim = (str: string) => {
  return str.replace(/\s+/g, '')
}

/**
 * 保留两位小数（固定）
 * @param {string|number} value 传入值
 * @return {string} 返回保留两位小数结果
 */
export const limitDecimals = (value: string | number) => {
  const reg = /^(\-)*(\d+)\.(\d\d).*$/
  if (typeof value === 'string') {
    return !isNaN(Number(value)) ? value.replace(reg, '$1$2.$3') : ''
  } else if (typeof value === 'number') {
    return !isNaN(value) ? String(value).replace(reg, '$1$2.$3') : ''
  } else {
    return ''
  }
}

/**
 * 保留小数位（灵活）
 * @param {number|string} n 传入值
 * @param {number|string} d 保留位数
 * @return {string} 返回保留两位小数结果
 */
export const fixNum = (n: number | string, d: number | string) => {
  //n传入数据
  //d保留小数位
  let f: any = n.toString()
  let dian = f.indexOf('.')
  let digit: any = d && d >= 0 ? d : 0
  if (dian >= 0) {
    //浮点数
    if (f.split('.')[1] == 0) {
      return parseFloat(f).toFixed(digit)
    } else {
      if (digit >= 1) {
        let m = Math.pow(10, digit)
        return (parseInt(String(f * m), 10) / m).toFixed(2)
      } else {
        return parseFloat(f)
      }
    }
  } else {
    //整数
    return parseFloat(f).toFixed(digit)
  }
}

/**
 * @desc 判断是否支持socket
 *
 * @return {boolean} 是否支持socket
 */
export const isSupportSocket = () => {
  return !!window.WebSocket
}

/**
 *
 * @param {*} path 必填 string 原始路由参数
 * @param {*} rank 非必填 默认 1 最大为3 number 需要返回的是几级路由
 * @return string
 */
export const routeMatching = (path: any, rank: number = 1) => {
  if (!path) throw 'path不应该为undefined'
  if (rank > 3) throw `暂不支持截取${rank}级路由`
  const routerArr = path.split('/')
  let router
  router =
    rank === 1
      ? '/' + routerArr[1]
      : rank === 2
      ? '/' + routerArr[1] + '/' + routerArr[2]
      : '/' + routerArr[1] + '/' + routerArr[2] + '/' + routerArr[3]
  return router
}

/**
 * @desc 格式化日期  type 为true值 H-mm-ss
 *
 * @return {string,boolean} 要格式化的值
 */
export const formatDateTime = (value: string, type?: boolean) => {
  if (type) {
    return moment(value).format('H:mm:ss')
  }
  return moment(value).format('YYYY-MM-DD')
}
