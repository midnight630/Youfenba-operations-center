const createRedisClient = require('./redis')

const socketApiRoutes = router => {
  /**
   * @route all /api/home
   * @desc 微信二维码扫码登录
   * @access 接口是公开到
   */
  router.all('/kapi/socket/qr_login', async ctx => {
    const { channel } = ctx.query
    console.log(channel)

    createRedisClient(channel, (channel, message) => {
      console.log(`on message channel: ${channel}`)
      waitForSocketConnection(ctx.websocket, () => {
        // 等待连接已经打开再去发送消息
        ctx.websocket.send(message)
      })
    })
    function waitForSocketConnection(socket, callback) {
      setTimeout(() => {
        if (socket.readyState == 1) {
          if (callback != null) {
            callback()
          }
        } else {
          waitForSocketConnection(socket, callback)
        }
      }, 1000)
    }

    // 监听web 端发来的消息
    ctx.websocket.on('message', function(res) {
      //   console.log('ctx websocket web message', res)
    })

    // 监听 关闭事件
    ctx.websocket.on('close', function() {
      // client.unsubscribe()
      console.log('ctx websocket close')
    })

    ctx.websocket.body = {
      status: true
    }
  })

  /**
   * @route all /api/home
   * @desc cps 全产品管理 课程更新
   * @access
   */
  router.all('/kapi/socket/cps_lzwk_batch_update', async ctx => {
    const { ticket } = ctx.query
    console.log(ticket)

    createRedisClient(ticket, (ticket, message) => {
      console.log(`on message ticket: ${ticket}`)
      waitForSocketConnection(ctx.websocket, () => {
        // 等待连接已经打开再去发送消息
        ctx.websocket.send(message)
      })
    })
    function waitForSocketConnection(socket, callback) {
      setTimeout(() => {
        if (socket.readyState == 1) {
          if (callback != null) {
            callback()
          }
        } else {
          waitForSocketConnection(socket, callback)
        }
      }, 1000)
    }

    // 监听web 端发来的消息
    ctx.websocket.on('message', function(res) {
      //   console.log('ctx websocket web message', res)
    })

    // 监听 关闭事件
    ctx.websocket.on('close', function() {
      // client.unsubscribe()
      console.log('ctx websocket close')
    })

    ctx.websocket.body = {
      status: true
    }
  })

  /**
   * @route all /api/home
   * @desc 微信二维码扫码登录
   * @access 接口是公开到
   */
  router.all('/kapi/socket/qr_bind', async ctx => {
    const { channel } = ctx.query
    console.log(channel)

    createRedisClient(channel, (channel, message) => {
      console.log(`on message channel: ${channel}`)
      waitForSocketConnection(ctx.websocket, () => {
        // 等待连接已经打开再去发送消息
        ctx.websocket.send(message)
      })
    })
    function waitForSocketConnection(socket, callback) {
      setTimeout(() => {
        if (socket.readyState == 1) {
          if (callback != null) {
            callback()
          }
        } else {
          waitForSocketConnection(socket, callback)
        }
      }, 1000)
    }

    // 监听web 端发来的消息
    ctx.websocket.on('message', function(res) {
      //   console.log('ctx websocket web message', res)
    })

    // 监听 关闭事件
    ctx.websocket.on('close', function() {
      // client.unsubscribe()
      console.log('ctx websocket close')
    })

    ctx.websocket.body = {
      status: true
    }
  })
}

module.exports = socketApiRoutes
