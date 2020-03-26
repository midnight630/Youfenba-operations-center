// socket
const Koa = require('koa')
const router = require('koa-router')()
const websockify = require('koa-websocket')
const app = websockify(new Koa())
const Config = require('../../config/const')
const socketApiRoutes = require('./route')
// socket route
socketApiRoutes(router)
// 注册路由
app.ws.use(router.routes()).use(router.allowedMethods())

app.listen(Config.socket.port, () =>
  console.log(`socket listening on port ${Config.socket.port}`)
)
