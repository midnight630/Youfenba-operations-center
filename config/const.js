const projectName = 'yfb_op_portal_new'
module.exports = {
  app_name: 'yfb.op.portal.new',
  projectName: projectName,
  is_socket: true, // 是否启用scoket
  server: {
    port: 3240
  },
  //   hotServer: {
  //     port: 8999
  //   },
  socket: {
    port: 3024
  },
  proxy: {
    port: 9240
  },
  env: [
    {
      name: 'release',
      title: '测试环境'
    },
    {
      name: 'production',
      title: '正式环境'
    }
  ],
  qiniu: {
    // 七牛上传地址
    // release: 'http://up.qiniup.com',
    // production: 'https://upload.qbox.me'
  },
  domain: {
    // 服务器地址
    release: 'https://admin-yfb-q2.youfenba.com',
    production: 'https://static.nmm.cloud'
  },
  apiUrl: {
    global: '/api/qiniu/global',
    staticToken: '/api/qiniu/static_token'
  }
}
