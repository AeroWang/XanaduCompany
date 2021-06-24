const NewsService = require('../services/articleService')
const moment = require('moment') // 时间格式化插件
module.exports = {
  // 根据新闻 类型、日期 查询，并按日期排序
  newsList: async (ctx) => {
    const params = ctx.query
    const {
      count,
      rows
    } = await NewsService.getNewsList(params)
    if (count > 0) {
      const newsList = []
      for (let i = 0; i < rows.length; i++) {
        // 格式化时间为 年-月-日
        let date = rows[i].dataValues.publish_time
        rows[i].dataValues.publish_time = moment(date).format('YYYY-MM-DD')
        const data = rows[i].dataValues
        newsList.push(data)
      }
      // console.log(newsList)
      ctx.body = {
        status: 200,
        msg: '获取成功',
        data: {
          list: newsList,
          total: count,
          limit: 10
        }
      }
    } else {
      ctx.body = {
        status: 'error',
        msg: '查询列表失败',
        data: null
      }
    }
  },
  // 获取热门新闻
  hotNews: async (ctx) => {
    const result = await NewsService.getHotNews()
    if (result.length > 0) {
      const hotNews = []
      for (let i = 0; i < result.length; i++) {
        let date = result[i].dataValues.publish_time
        result[i].dataValues.publish_time = moment(date).format('YYYY-MM-DD')
        const data = result[i].dataValues
        hotNews.push(data)
      }
      ctx.body = {
        status: 200,
        msg: '获取成功',
        data: { list: hotNews }
      }
    } else {
      ctx.body = {
        status: 'error',
        msg: '获取失败',
        data: null
      }
    }
  },
  // 获取关键词搜索新闻
  searchNews: async (ctx) => {
    const { keyword } = ctx.params
    const result = await NewsService.searchNews(keyword)
    // console.log(result)
    if (result.length > 0) {
      const searchNews = []
      for (let i = 0; i < result.length; i++) {
        const data = result[i].dataValues
        searchNews.push(data)
      }
      ctx.body = {
        status: 200,
        msg: '获取成功',
        data: { list: searchNews }
      }
    } else {
      ctx.body = {
        status: 'error',
        msg: '获取失败'
      }
    }
  },
  // 获取推荐新闻
  recommendNews: async (ctx) => {
    const result = await NewsService.getRecommendNews()
    // console.log(result)
    if (result.length > 0) {
      const recommendNews = []
      for (let i = 0; i < result.length; i++) {
        const data = result[i].dataValues.aw_new.dataValues
        recommendNews.push(data)
      }
      ctx.body = {
        status: 200,
        msg: '获取成功',
        data: { list: recommendNews }
      }
    } else {
      ctx.body = {
        status: 'error',
        msg: '获取失败'
      }
    }
  },
  // 获取新闻详情
  newsDetail: async (ctx) => {
    // console.log(ctx.request.path)
    // 截取出文章详情ID
    const articleId = ctx.request.path.substring(20)
    const result = await NewsService.getNewsDetail(articleId)
    if (result) {
      ctx.body = {
        status: 200,
        msg: '获取成功',
        data: {
          news_detail: result.dataValues
        }
      }
    }
  },
}
