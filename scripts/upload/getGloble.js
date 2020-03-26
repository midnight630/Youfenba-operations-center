const needle = require('needle')

const getGloble = url =>
  new Promise(resolve => {
    needle.get(url, (err, resp) => {
      if (err) throw new Error(err)
      resolve(resp.body)
    })
  })

module.exports = getGloble
