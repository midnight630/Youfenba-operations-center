const inquirer = require('inquirer')
const shell = require('shelljs')

const Config = require('../config/const')

const start = async () => {
  const result = await inquirer.prompt({
    type: 'list',
    name: 'env',
    message: '请选择启动环境',
    filter: title => {
      let name = title
      for (let i = 0; i < Config.env.length; i++) {
        if (Config.env[i].title === title) {
          name = Config.env[i].name
          break
        }
      }
      return name
    },
    choices: Config.env.map(item => item.title)
  })

  await shell.exec(`pm2 start scripts/app.config.js --env=${result.env}`)
}

start()
