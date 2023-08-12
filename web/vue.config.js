const path = require('path')
const config = require('process').config
const IS_PROD = process.env.NODE_ENV === 'production'
const CompressionPlugin = require('compression-webpack-plugin')
const USE_CDN = false // 这个开关用来控制CDN
// 优化打包
// externals
const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  'element-plus': 'ElementPlus',
  // 'mavon-editor': 'mavonEditor',
  axios: 'axios'
}
const cdn = {
  // 开发环境
  dev: {
    css: [],
    js: []
  },
  // 生产环境
  // vue3 要使用 mavon-editor@next 该版本未发布npm,暂时无法cdn。
  build: {
    css: [
      'https://cdn.jsdelivr.net/npm/element-plus@2.3.4/dist/index.css'
      // 'https://cdn.jsdelivr.net/npm/mavon-editor@2.9.1/dist/css/index.css'
    ],
    js: [
      'https://cdn.jsdelivr.net/npm/vue@3.2.47/dist/vue.global.js',
      'https://cdn.jsdelivr.net/npm/vue-router@4.1.6/dist/vue-router.global.js',
      'https://cdn.jsdelivr.net/npm/vuex@4.1.0/dist/vuex.global.js',
      'https://cdn.jsdelivr.net/npm/element-plus@2.3.4/dist/index.full.min.js',
      // 'https://cdn.jsdelivr.net/npm/mavon-editor@2.9.1/dist/mavon-editor.min.js',
      'https://cdn.jsdelivr.net/npm/axios@0.18.0/dist/axios.min.js'
    ]
  }
}
/**
 * @type {import("@vue/cli-service").ProjectOptions}
 */
const VueConfig = {
  publicPath: '/',
  devServer: {
    host: '0.0.0.0',
    port: 9000,
    /** 使用proxy生产时nginx记得使用反向代理！！
     *反向代理的是接口，页面是静态的，不需要反向代理！
    *如果你不会nginx,不建议看乱七八糟的博客，请在bilibili学习一下，或
    * 参考菜鸟教程：https://www.runoob.com/w3cnote/nginx-install-and-config.html
     * 如果你更懒一些，可以使用【宝塔面板进行部署】**/
    proxy: {
      '/api': {
        target: IS_PROD ? 'https://company.zerotower.cn' : 'http://localhost:3000',
        // ws: true,
        changeOrigin: true
        // pathRewrite: {//路径重写
        //   '^/api': '/api/private/v1/'
        // }
      }
    }
  },
  lintOnSave: false,
  // 优化打包
  // 去除生产环境的productionSourceMap
  productionSourceMap: false,
  configureWebpack: config => {
    // 为生产环境修改配置...
    // 去除console.log打印以及注释
    const plugins = []
    if (IS_PROD) {
      config.optimization.minimizer[0].options.terserOptions.compress.warnings = false
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
      config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log']
      plugins.push(
        new CompressionPlugin({
          algorithm: 'gzip',
          test: /\.(js|css)$/, // 匹配文件名
          threshold: 10000, // 对超过10k的数据压缩
          deleteOriginalAssets: false, // 不删除源文件
          minRatio: 0.8 // 压缩比
        })
      )
      if (USE_CDN) {
        config.externals = externals
      }
    }
    return { plugins }
  },
  chainWebpack: (config) => {
    config.when(IS_PROD, (config) => {
      // 生产环境时使用生产环境的入口文件，清空原来的，再添加新的入口文件
      config.entry('app').clear().add('./src/main-prod.ts')
      config.output.filename('js/[name].js')
      config.output.chunkFilename('js/[name].js')

      /**
             * 添加CDN参数到htmlWebpackPlugin配置中
             */
      config.plugin('html').tap((args) => {
        if (USE_CDN) {
          args[0].cdn = cdn.build
        }
        args[0].title = 'Xanadu'
        return args
      })
      // 压缩图片(目前引发了诸多bug，暂时拿掉吧)
      // config.module
      //   .rule('images')
      //   .use('image-webpack-loader')
      //   .loader('image-webpack-loader')
      //   .options({ bypassOnDebug: true })
      //   .end()
    })
    // 开发阶段
    config.when(process.env.NODE_ENV === 'development', config => {
      // development时使用自己的入口文件
      config.entry('app').clear().add('./src/main-dev.ts')
      config.plugin('html').tap(args => {
        args[0].cdn = cdn.dev
        args[0].title = 'Dev-Xanadu'
        return args
      })
    })
  },
  pluginOptions: {
    // 目的是注入全局的less变量
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/assets/style/variable.less')
      ]
    }
  }
}

module.exports = VueConfig
