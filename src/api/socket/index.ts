import { isSupportSocket } from 'src/utils/util'

interface ScoketEvent {
  open?: () => void
  message?: (event: MessageEvent) => void
  error?: () => void
  close?: () => void
}

/**
 * @desc 创建socket 链接
 * @param {string} pathname socket api 地址
 *
 * @return {WebSocket} WebSocket 对象
 */
const createSocket = (pathname: string, eventOption?: ScoketEvent) => {
  let wsServer: WebSocket | null = null

  if (isSupportSocket()) {
    // 请求socket
    wsServer = new WebSocket(
      `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${
        window.location.host
      }${pathname}`
    )
    // 初始化socket 事件
    let _interval: NodeJS.Timer | null = null
    let _setTimeout: NodeJS.Timer | null = null

    if (wsServer) {
      const socketOpen = () => {
        if (eventOption && eventOption.open) {
          eventOption.open()
        }
        // 心跳检查
        wsServer && wsServer.send('socket heart check')
        _interval = setInterval(() => {
          wsServer && wsServer.send('socket heart check')
        }, 30 * 1000)
      }

      const socketMessage = (event: MessageEvent) => {
        if (eventOption && eventOption.message) {
          eventOption.message(event)
        }
      }
      const socketError = () => {
        if (eventOption && eventOption.error) {
          eventOption.error()
        }
        if (_interval) clearInterval(_interval)
        wsServer = null
        console.log('websocket error')
        // if (this.socketCount > 50) {
        //   return
        // }
        // if (_setTimeout) {
        //   return
        // }
      }

      const socketClose = () => {
        if (eventOption && eventOption.close) {
          eventOption.close()
        }

        if (wsServer) {
          wsServer.removeEventListener('open', socketOpen)
          wsServer.removeEventListener('message', socketMessage)
          wsServer.removeEventListener('error', socketError)
        }
        if (_interval) clearInterval(_interval)
        if (_setTimeout) clearTimeout(_setTimeout)
      }

      // 连接建立时触发
      wsServer.addEventListener('open', socketOpen)
      // 监听消息 客户端接收服务端数据时触发
      wsServer.addEventListener('message', socketMessage)
      // 通信发生错误时触发
      wsServer.addEventListener('error', socketError)

      // 通信发生错误时触发
      wsServer.addEventListener('close', socketClose)
    }
  } else {
    console.error('该浏览器不支持socket， 请安装新版本')
  }

  return wsServer
}

export default createSocket
