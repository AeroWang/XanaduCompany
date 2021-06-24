module.exports = {
  title: 'Xanadu',

  /**
   * @type {boolean} true | false
   * @description 是否显示设置右面板
   */
  showSettings: true,

  /**
   * @type {boolean} true | false
   * @description 是否需要 tagsView
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description 是否固定header
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description 是否在侧边栏中显示徽标
   */
  sidebarLogo: false,

  /**
   * @type {boolean} true | false
   * @description headerSearch中是否支持拼音搜索
   * Bundle size minified 47.3kb,minified + gzipped 63kb
   */
  supportPinyinSearch: true,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description 需要显示错误日志组件。
   * 默认值仅在生产环境中使用
   * 如果您还想在dev中使用它，可以传递['production'，'development']
   */
  errorLog: 'production'
}
