const config = require('../config/const')

const app = {
  name: `${config.app_name}`, // app名
  script: './server', // 要启动都node服务
  // http://pm2.keymetrics.io/docs/usage/watch-and-restart/
  // 当在当前目录或其子目录中修改文件时，PM2可以自动重新启动应用程序
  watch: ['server'],
  // 忽略需要监听的文件
  ignore_watch: [
    'node_modules',
    '_download',
    'src',
    'scripts',
    'public',
    'server/logs'
  ], // 为了解决 这几个文件夹中文件变化是 服务不需要重启 可以避免`_download`中文件写入时出错
  env: {
    NODE_ENV: 'development'
  }
}

const socket = {
  name: `${config.app_name}_socket`, // scoket app 名
  script: './server/socket', // 要启动都node socket服务
  // http://pm2.keymetrics.io/docs/usage/watch-and-restart/
  // 当在当前目录或其子目录中修改文件时，PM2可以自动重新启动应用程序
  watch: ['server/socket'],
  // 忽略需要监听的文件
  ignore_watch: [
    'node_modules',
    '_download',
    'src',
    'scripts',
    'public',
    'server/logs'
  ],
  env: {
    NODE_ENV: 'development'
  }
}

config.env.forEach(item => {
  app[`env_${item.name}`] = {
    NODE_ENV: item.name
  }
  socket[`env_${item.name}`] = {
    NODE_ENV: item.name
  }
})

module.exports = {
  apps: config.is_socket ? [app, socket] : [app]
}
