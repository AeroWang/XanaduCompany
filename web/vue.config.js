const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin') // 开启压缩
const isProduction = process.env.NODE_ENV === 'production'

// 优化打包
// externals
const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  'element-ui': 'ElementUI',
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
  build: {
    css: [
      'https://cdn.jsdelivr.net/npm/element-ui@2.15.1/lib/theme-chalk/index.css',
      'https://cdn.jsdelivr.net/npm/element-ui@2.15.1/lib/theme-chalk/display.css',
      'https://cdn.jsdelivr.net/npm/mavon-editor@2.9.1/dist/css/index.css'
    ],
    js: [
      'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
      'https://cdn.jsdelivr.net/npm/vue-router@3.2.0/dist/vue-router.min.js',
      'https://cdn.jsdelivr.net/npm/vuex@3.4.0/dist/vuex.min.js',
      'https://cdn.jsdelivr.net/npm/element-ui@2.15.1/lib/index.js',
      // 'https://cdn.jsdelivr.net/npm/mavon-editor@2.9.1/dist/mavon-editor.min.js',
      'https://cdn.jsdelivr.net/npm/axios@0.18.0/dist/axios.min.js'
      // 'https://unpkg.com/element-ui/lib/index.js'
    ]
  }
}

module.exports = {
  publicPath: '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        // ws: true,
        changeOrigin: true
        // pathRewrite: {
        //   '^/api': '/api/private/v1/'
        // }
      }
    }
  },
  // 优化打包
  // 去除生产环境的productionSourceMap
  productionSourceMap: false,
  configureWebpack: config => {
    // 为生产环境修改配置...
    // 去除console.log打印以及注释
    const plugins = []
    if (isProduction) {
      plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              comments: false // 去掉注释
            },
            warnings: false,
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log']// 移除console
            }
          }
        })
      )
      plugins.push(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: /\.(js|css)$/, // 匹配文件名
          threshold: 10000, // 对超过10k的数据压缩
          deleteOriginalAssets: false, // 不删除源文件
          minRatio: 0.8 // 压缩比
        })
      )
      // 打包时npm包转CDN
      config.externals = externals
    }
    return { plugins }
  },
  chainWebpack: config => {
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main-prod.js')
      /**
       * 添加CDN参数到htmlWebpackPlugin配置中
       */
      config.plugin('html').tap(args => {
        args[0].cdn = cdn.build
        args[0].title = 'Xanadu'
        return args
      })
      // 压缩图片
      config.module
        .rule('images')
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({ bypassOnDebug: true })
        .end()
    })
    // 开发阶段
    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js')
      config.plugin('html').tap(args => {
        args[0].cdn = cdn.dev
        args[0].title = 'Dev-Xanadu'
        return args
      })
    })
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, 'src/assets/style/variable.less')
      ]
    }
  }
}
