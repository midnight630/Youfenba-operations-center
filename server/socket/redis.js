const redis = require('redis')
const dotenv = require('dotenv').config({
  path: process.env.NODE_ENV == 'production' ? '.env' : '.env.local'
})
const ENV = dotenv.parsed
const redisConfig = {
  host: ENV.REDIS_HOST,
  port: ENV.REDIS_PORT,
  password: ENV.REDIS_PASSWORD,
  db: ENV.REDIS_DB
}

// http://redis.js.org/
const createRedisClient = (channel, callback) => {
  // https://www.npmjs.com/package/redis
  let client = redis.createClient(redisConfig)
  //  订阅
  client.subscribe(channel)
  // 监听redis 的ready
  client.on('ready', () => {
    console.log(
      'Redis [%s:%s/%s] is connected and ready for subscribe channel [%s] use.',
      redisConfig.host,
      redisConfig.port,
      redisConfig.database,
      channel
    )
  })
  // 监听redis 的connect
  client.on('connect', () => {
    console.log('Redis connect')
  })
  // 接收消息
  client.on('message', async (channel, message) => {
    console.log(
      'Received subscribe message, channel [%s] message [%s]',
      channel,
      message
    )
    await callback(channel, message)
  })

  // 监听redis 的connect
  client.on('reconnecting', err => {
    console.log('Redis reconnecting:' + err)
  })

  // 监听redis 的错误
  client.on('error', err => {
    console.log('Redis Error:' + err)
  })

  // 监听redis 订阅事件
  client.on('subscribe', (channel, count) => {
    console.log(
      'client subscribed to ' + channel + ',' + count + ' total subscriptions'
    )
  })

  // 监听redis 取消订阅事件
  client.on('unsubscribe', (channel, count) => {
    console.log(
      'client unsubscribed from' +
        channel +
        ', ' +
        count +
        ' total subscriptions'
    )
  })

  return client
}

module.exports = createRedisClient
