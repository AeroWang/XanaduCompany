'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'Xanadu' // page title

// 如果端口设置为80，
// 使用管理员权限执行命令行。
// 例如，Mac:sudo npm run
// 可以通过以下方法更改端口：
// port = 4000 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 4000 // dev port

// 所有配置项说明可在中找到 https://cli.vuejs.org/config/
module.exports = {
  /**
   * 如果计划在子路径下部署站点，则需要设置publicPath，
   * 例如GitHub页面。如果您计划将站点部署到https://foo.github.io/bar/,
   * 那么publicPath应该设置为 "/bar/".
   * 在大多数情况下，请使用'/' !!!
   * 细节: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: '/admin/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: {
    // 在webpack的name字段中提供应用程序的标题，以便
    // 可以在index.html中访问它以插入正确的标题。
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    // 它可以提高第一屏的速度，建议开启预加载
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // 当页面太多时，会导致太多无意义的请求
    config.plugins.delete('prefetch')

    // 设置 svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // 设置保留空格
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime`必须与runtimeChunk名称相同。默认值为“runtime”`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' //仅包最初依赖的第三方
                },
                elementUI: {
                  name: 'chunk-elementUI', // 将elementUI拆分为单个包
                  priority: 20, // 重量需要大于libs和app，否则将打包为libs或app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // 为了适应cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // 可以自定义规则
                  minChunks: 3, //  最小公共数
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
