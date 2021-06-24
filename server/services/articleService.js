const {
  News,
  NewsType,
  RecommendNews,
  Op
} = require('../models/index')

class ArticleService {
  /**
   * web
   */
  // 根据新闻 类型、日期 查询，并按日期排序
  async getNewsList (params) {
    if (params.selectDate) {
      return News.findAndCountAll({
        where: {
          [Op.and]: [
            { type: params.activeName },
            {
              publish_time: {
                [Op.startsWith]: params.selectDate
              },
            },
            { state: 1 }
          ]
        },
        attributes: { exclude: ['news_content'] },
        limit: parseInt(params.pagesize),
        // 跳过实例数目
        offset: (params.pagenum - 1) * parseInt(params.pagesize),
        order: [
          ['publish_time', 'DESC']
        ]
      })
    } else if (params.activeName) {
      return News.findAndCountAll({
        where: {
          type: params.activeName,
          state: 1
        },
        attributes: { exclude: ['news_content'] },
        limit: parseInt(params.pagesize),
        // 跳过实例数目
        offset: (params.pagenum - 1) * parseInt(params.pagesize),
        order: [
          ['publish_time', 'DESC']
        ]
      })
    } else {
      return News.findAndCountAll({
        where: {
          state: 1
        },
        attributes: { exclude: ['news_content'] },
        limit: parseInt(params.pagesize),
        // 跳过实例数目
        offset: (params.pagenum - 1) * parseInt(params.pagesize)
        // order: [
        //   ['publish_time', 'DESC']
        // ]
      })
    }
  }
  
  // 查询热门新闻
  async getHotNews () {
    return News.findAll({
      where: {
        is_hot: 1
      },
      attributes: ['news_id', 'news_title', 'news_path', 'publish_time']
    })
  }
  
  // 根据查询关键词查询新闻
  async searchNews (keyWord) {
    return News.findAll({
      where: {
        news_title: {
          [Op.substring]: keyWord
        }
      },
      attributes: ['news_title', 'news_path', 'news_desc']
    })
  }
  
  // 查询推荐新闻
  async getRecommendNews () {
    return RecommendNews.findAll({
      include: [{
        model: News,
        attributes: ['news_title', 'cover_img', 'news_path']
      }]
    })
  }
  
  // 获取新闻详情
  async getNewsDetail (params) {
    return News.findOne({
      where: {
        news_path: params
      },
      include: [{
        model: NewsType,
        attributes: ['type_name']
      }]
    })
  }
}

module.exports = new ArticleService()
