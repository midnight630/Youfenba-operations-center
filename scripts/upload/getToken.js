const needle = require('needle')
/**
 * 获取token
 *
 * @param {*} url 获取token的接口
 *
 * @return {Promise}
 *
 */
const getToken = url =>
  new Promise(resolve => {
    needle.get(url, (err, resp) => {
      if (err) throw new Error(err)
      resolve(resp.body)
    })
  })

module.exports = getToken
