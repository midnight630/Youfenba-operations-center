const qiniu = require('qiniu')
const path = require('path')

var config = new qiniu.conf.Config()
// 空间对应的机房
config.zone = qiniu.zone.Zone_z0

/**
 *
 * @param {string} upUrl 上传路径
 * @param {string} filepath 文件路径
 * @param {*} token
 * @param {object} options
 * {
 *      prefix {string} 存储文件所在文件夹
 *      name {string} 存储的文件名
 * }
 *
 * @return {Promine} 返回文件上传成功的结果
 */

const upload = async (filepath, token, options = { prefix: '', name: '' }) => {
  var formUploader = new qiniu.form_up.FormUploader(config)
  var putExtra = new qiniu.form_up.PutExtra()
  const name = path.basename(filepath)
  var key = options.name
    ? `${options.prefix}/${options.name}`
    : `${options.prefix}/${name}`

  return await new Promise((resolve, reject) => {
    // 文件上传
    formUploader.putFile(token, key, filepath, putExtra, function(
      respErr,
      respBody,
      respInfo
    ) {
      if (respErr) {
        throw respErr
      }
      if (respInfo.statusCode == 200) {
        // console.log('respBody', respBody)
        resolve(`${respBody.url}`)
      } else {
        console.log('七牛上传失败 statusCode=', respInfo.statusCode)
        // console.log(respBody)
        reject(respInfo)
      }
    })
  })
}

module.exports = upload
