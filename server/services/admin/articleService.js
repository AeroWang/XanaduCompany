/**
 * @Description:
 * @author Aerowang
 * @date 2021/5/26
 */
const {
  News,
  NewsType
} = require('../../models/index')

class AdminArticleService {
  async getCategory () {
    return NewsType.findAll()
  }
  
  async getArticleDetail (params) {
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
  
  async getArticleList (params) {
    if (params.category) {
      return News.findAndCountAll({
        where: {
          type: params.category
        },
        attributes: { exclude: ['news_content'] },
        limit: parseInt(params.pagesize),
        // 跳过实例数目
        offset: (params.pagenum - 1) * parseInt(params.pagesize),
        include: [{
          model: NewsType,
          attributes: ['type_name']
        }]
      })
    } else {
      return News.findAndCountAll({
        attributes: { exclude: ['news_content'] },
        limit: parseInt(params.pagesize),
        // 跳过实例数目
        offset: (params.pagenum - 1) * parseInt(params.pagesize),
        include: [{
          model: NewsType,
          attributes: ['type_name']
        }]
      })
    }
  }

// 创建新闻
  async createArticle (params) {
    return News.create(params)
  }

// 更新新闻
  async updateArticle (path, value) {
    await News.update(value, {
      where: {
        news_path: path
      }
    })
  }

//  删除新闻
  async deleteArticle (path) {
    await News.destroy({
      where: {
        news_path: path
      }
    })
  }
}

module.exports = new AdminArticleService()
