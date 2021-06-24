import Vue from 'vue'

import 'normalize.css/normalize.css' // CSS重置的现代替代方案

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import './assets/font/iconfont'
import axios from 'axios'

import '@/styles/index.scss' // 全局css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // 权限控制


// 网站统计
/* eslint-disable */
var _hmt = _hmt || []
window._hmt = _hmt; // 将_hmt挂载到window下
(function () {
  var hm = document.createElement("script")
  hm.src = "https://hm.baidu.com/hm.js?xxxxxxxxxxx"
  var s = document.getElementsByTagName("script")[0]
  s.parentNode.insertBefore(hm, s)
})()
/* eslint-enable */

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)
Vue.component('mavon-editor', mavonEditor)
Vue.config.productionTip = false
Vue.prototype.$http = axios
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
