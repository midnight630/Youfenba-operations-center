const Router = require('koa-router')
const router = new Router()

/**
 * @route GET /api/home
 * @desc 首页
 * @access 接口是公开到
 */
router.get('/home', async (ctx, next) => {
  ctx.body = 'Hello World!'
})

/**
 * @route GET /api/home
 * @desc 首页
 * @access 接口是公开到
 */
router.get('/user', async (ctx, next) => {
  ctx.body = {
    code: 200,
    msg: '成功',
    data: {
      name: 'shineshao',
      id: '001',
      email: 'xiaoshaoqq@gmail.com'
    },
    xx: ctx.request.body
  }
})

module.exports = router.routes()
