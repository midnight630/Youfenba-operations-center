const inquirer = require('inquirer')
const shell = require('shelljs')
const config = require('../config/const')

const start = async () => {
  const result = await inquirer.prompt({
    type: 'list',
    name: 'step',
    message: '请选择操作',
    choices: ['stop', 'delete']
  })

  await shell.exec(`pm2 ${result.step} ${config.app_name}`)
  if (config.is_socket)
    await shell.exec(`pm2 ${result.step} ${config.app_name}_socket`)
}

start()
