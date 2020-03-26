// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production'

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err
})

// Ensure environment variables are read.
require('../config/env')

const path = require('path')
const chalk = require('react-dev-utils/chalk')
const fs = require('fs-extra')
const webpack = require('webpack')
const configFactory = require('../config/webpack.config')
const paths = require('../config/paths')
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles')
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages')
const printHostingInstructions = require('react-dev-utils/printHostingInstructions')
const FileSizeReporter = require('react-dev-utils/FileSizeReporter')
const printBuildError = require('react-dev-utils/printBuildError')
const inquirer = require('inquirer')
const colors = require('colors')
const glob = require('glob')

const Const = require('../config/const')
const { Upload, getToken, getGloble } = require('./upload')

const measureFileSizesBeforeBuild = FileSizeReporter.measureFileSizesBeforeBuild
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild
const useYarn = fs.existsSync(paths.yarnLockFile)

// These sizes are pretty large. We'll warn for bundles exceeding them.
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024

const isInteractive = process.stdout.isTTY

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1)
}

// Generate configuration
let webpackConfig = {}

/**
 * @desc 根据用户的环境选择打包
 *
 */
const start = async () => {
  const result = await inquirer.prompt({
    type: 'list',
    name: 'env',
    message: '请选择build环境',
    filter: title => {
      let name = title
      for (let i = 0; i < Const.env.length; i++) {
        if (Const.env[i].title === title) {
          name = Const.env[i].name
          break
        }
      }
      return name
    },
    choices: Const.env.map(item => item.title)
  })

  const env = result.env

  const Domain = `${Const.domain[result.env]}`
  const _global = await getGloble(`${Domain}${Const.apiUrl['global']}`)
  const qiniu = _global.data
  console.log(qiniu, '七牛')
  if (!qiniu.qiniu_static_domain) {
    console.log(
      colors.red.underline(
        '\n 七牛CDN 静态地址没有获取到请检查 /api/qiniu/global 接口\n'
      )
    )
    process.exit(0)
    return
  }

  const qiniu_static_domain = qiniu.qiniu_static_domain.replace(
    /^http[s]?:/,
    ''
  )

  webpackConfig = configFactory(
    env,
    `${qiniu_static_domain}${Const.projectName}/`
  )

  // We require that you explicitly set browsers and do not fall back to
  // browserslist defaults.
  const { checkBrowsers } = require('react-dev-utils/browsersHelper')
  await checkBrowsers(paths.appPath, isInteractive)
    .then(() => {
      // First, read the current file sizes in build directory.
      // This lets us display how much they changed later.
      return measureFileSizesBeforeBuild(paths.appBuild)
    })
    .then(previousFileSizes => {
      // Remove all content but keep the directory so that
      // if you're in it, you don't end up in Trash
      fs.emptyDirSync(paths.appBuild)
      // Merge with the public folder
      copyPublicFolder()
      // Start the webpack build
      return build(previousFileSizes)
    })
    .then(
      ({ stats, previousFileSizes, warnings }) => {
        if (warnings.length) {
          console.log(chalk.yellow('Compiled with warnings.\n'))
          console.log(warnings.join('\n\n'))
          console.log(
            '\nSearch for the ' +
              chalk.underline(chalk.yellow('keywords')) +
              ' to learn more about each warning.'
          )
          console.log(
            'To ignore, add ' +
              chalk.cyan('// eslint-disable-next-line') +
              ' to the line before.\n'
          )
        } else {
          console.log(chalk.green('Compiled successfully.\n'))
        }

        console.log('File sizes after gzip:\n')
        printFileSizesAfterBuild(
          stats,
          previousFileSizes,
          paths.appBuild,
          WARN_AFTER_BUNDLE_GZIP_SIZE,
          WARN_AFTER_CHUNK_GZIP_SIZE
        )

        const appPackage = require(paths.appPackageJson)
        const publicUrl = paths.publicUrl
        const publicPath = webpackConfig.output.publicPath
        const buildFolder = path.relative(process.cwd(), paths.appBuild)
        printHostingInstructions(
          appPackage,
          publicUrl,
          publicPath,
          buildFolder,
          useYarn
        )
      },
      err => {
        const tscCompileOnError = process.env.TSC_COMPILE_ON_ERROR === 'true'
        if (tscCompileOnError) {
          console.log(
            chalk.yellow(
              'Compiled with the following type errors (you may want to check these before deploying your app):\n'
            )
          )
          printBuildError(err)
        } else {
          console.log(chalk.red('Failed to compile.\n'))
          printBuildError(err)
          process.exit(1)
        }
      }
    )
    .catch(err => {
      if (err && err.message) {
        console.log(err.message)
      }
      process.exit(1)
    })

  // upload static file
  // 获取token
  const tokenApi = `${Domain}${Const.apiUrl['staticToken']}`
  let response = await getToken(tokenApi)
  console.log(response)
  let tokenBody = response.data
  // 开始上传图片
  console.log(colors.yellow.underline('开始上传静态资源图片'))
  await startUploadImage(result.env, tokenBody.token, qiniu)
  console.log(colors.green('静态资源图片上传成功\n'))

  // 重新获取token
  response = await getToken(tokenApi)
  tokenBody = response.data
  // 开始上传js/css 文件
  console.log(colors.yellow.underline('开始上传静态资源js/css'))
  await startUpload(result.env, tokenBody.token, qiniu)
  console.log(colors.green('js/css 文件上传成功'))
}

start()

/**
 * @desc 上传静态js/css资源
 * @param {string} env 环境变量
 * @param {string} token
 *
 */
async function startUpload(env, token, qiniu) {
  const files = glob.sync(`${paths.appBuild}/static/{js,css}/**/*.{js,css}`)

  if (files.length === 0) throw new Error('请先build环境静态资源')

  for (let filepath of files) {
    const fileExtension = filepath.substring(filepath.lastIndexOf('.') + 1)
    // 文件上传
    const qiniuUrl = await Upload(filepath, token, {
      prefix: `${Const.projectName}/static/${fileExtension}`
    })
    console.log(colors.underline(filepath))
    console.log(colors.magenta(`${qiniu.qiniu_static_domain}${qiniuUrl}`))
  }
}

/**
 * @desc 上传静态图片资源
 * @param {string} env
 * @param {string} token
 *
 */
async function startUploadImage(env, token, qiniu) {
  const files = glob.sync(
    `${paths.appBuild}/static/media/**/*.{png,jpg,gif,jpeg,svg}`
  )

  for (let filepath of files) {
    // 文件上传
    const qiniuUrl = await Upload(filepath, token, {
      prefix: `${Const.projectName}/static/media`
    })
    console.log(colors.underline(filepath))
    console.log(colors.magenta(`${qiniu.qiniu_static_domain}${qiniuUrl}`))
  }
}

// Create the production build and print the deployment instructions.
function build(previousFileSizes) {
  // We used to support resolving modules according to `NODE_PATH`.
  // This now has been deprecated in favor of jsconfig/tsconfig.json
  // This lets you use absolute paths in imports inside large monorepos:
  if (process.env.NODE_PATH) {
    console.log(
      chalk.yellow(
        'Setting NODE_PATH to resolve modules absolutely has been deprecated in favor of setting baseUrl in jsconfig.json (or tsconfig.json if you are using TypeScript) and will be removed in a future major release of create-react-app.'
      )
    )
    console.log()
  }

  console.log('Creating an optimized production build...')

  const compiler = webpack(webpackConfig)
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      let messages
      if (err) {
        if (!err.message) {
          return reject(err)
        }
        messages = formatWebpackMessages({
          errors: [err.message],
          warnings: []
        })
      } else {
        messages = formatWebpackMessages(
          stats.toJson({ all: false, warnings: true, errors: true })
        )
      }
      if (messages.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (messages.errors.length > 1) {
          messages.errors.length = 1
        }
        return reject(new Error(messages.errors.join('\n\n')))
      }
      if (
        process.env.CI &&
        (typeof process.env.CI !== 'string' ||
          process.env.CI.toLowerCase() !== 'false') &&
        messages.warnings.length
      ) {
        console.log(
          chalk.yellow(
            '\nTreating warnings as errors because process.env.CI = true.\n' +
              'Most CI servers set it automatically.\n'
          )
        )
        return reject(new Error(messages.warnings.join('\n\n')))
      }

      return resolve({
        stats,
        previousFileSizes,
        warnings: messages.warnings
      })
    })
  })
}

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml
  })
}
