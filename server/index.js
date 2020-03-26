const Koa = require('koa')
const views = require('koa-views')
const router = require('koa-router')()
const Static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const path = require('path')
const env = process.env.NODE_ENV
const Config = require('../config/const')
const app = new Koa()

// api接口
const Api = require('./route/api')

// 处理请求参数的中间件
app.use(
  bodyParser({
    strict: true
  })
)

// 设置静态资源文件的中间件
app.use(Static(path.join(__dirname, `../resources/${env}`)))

// view 模版
app.use(
  views(path.join(__dirname, `../resources/` + env), {
    extension: 'ejs'
  })
)

if (process.env.NODE_ENV === 'production') {
  router.get('*', async (ctx, next) => {
    await ctx.render('production_index', {
      env: process.env.NODE_ENV
      // title: '',
      // port: Config.hotServer.port,
      // global,
      // _manifest: encodeURIComponent(JSON.stringify(_manifest))
    })
    await next()
  })
} else if (process.env.NODE_ENV === 'release') {
  router.get('*', async (ctx, next) => {
    await ctx.render('release_index', {
      env: process.env.NODE_ENV
    })
    await next()
  })
}

// 开发环境 不是使用下面的代码

router.use('/kapi', Api)

// 注册路由
app.use(router.routes()).use(router.allowedMethods())

app.listen(Config.server.port)
