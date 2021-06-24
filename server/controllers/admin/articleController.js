const NewsService = require('../../services/admin/articleService')
const moment = require('moment') // 时间格式化插件
module.exports = {
  // 获取新闻分类
  getCategory: async ctx => {
    const result = await NewsService.getCategory()
    const category = []
    for (let i = 0; i < result.length; i++) {
      const tmp = {
        type_id: result[i].dataValues.type_id,
        type_name: result[i].dataValues.type_name
      }
      category.push(tmp)
    }
    if (result.length > 0) {
      ctx.body = {
        status: 200,
        msg: '获取成功',
        data: {
          category: category,
        }
      }
    }
  },
  // 获取新闻详情
  getArticleDetail: async ctx => {
    const articlePath = ctx.request.path.substring(22)
    const result = await NewsService.getArticleDetail(articlePath)
    if (result) {
      result.dataValues.category = result.dataValues.aw_news_type.dataValues.type_name
      delete result.dataValues.aw_news_type
      ctx.body = {
        status: 200,
        msg: '获取成功',
        data: {
          articleDetail: result.dataValues
        }
      }
    }
  },
  // 获取新闻
  getArticleList: async (ctx) => {
    const params= ctx.query
    const {
      count,
      rows
    } = await NewsService.getArticleList(params)
    if (count > 0) {
      const newsList = []
      for (let i = 0; i < rows.length; i++) {
        const data = rows[i].dataValues
        // 格式化时间为 年-月-日
        let date = data.update_time
        data.update_time = moment(date).format('YYYY-MM-DD')
        data.type = data.aw_news_type.dataValues.type_name
        delete data.aw_news_type
        
        newsList.push(data)
      }
      ctx.body = {
        status: 200,
        msg: '获取成功',
        data: {
          list: newsList,
          total: count,
          limit: 10
        }
      }
    }
  },
  // 创建新闻
  createNews: async (ctx) => {
    const articleObj = ctx.request.body
    if (articleObj) {
      // console.log(articleObj)
      const newArticle = {
        news_title: articleObj.title,
        news_desc: articleObj.description,
        cover_img: articleObj.coverImg,
        news_content: articleObj.content,
        news_path: `${Date.now()}${Number.parseInt(Math.random() * 10000)}`,
        type: articleObj.category,
        state: articleObj.state
      }
      const result = await NewsService.createArticle(newArticle)
      ctx.body = {
        status: 200,
        msg: '文章创建成功',
        data: {
          path: result.dataValues.news_path
        }
      }
    }
  },
  // 更新新闻
  updateArticle: async ctx => {
    const editPath = ctx.request.path.substring(22)
    const articleObj = ctx.request.body
    // 获取对象的key，输出数组
    if (articleObj) {
      const articleObjArr = Object.keys(articleObj)
      if (articleObjArr.length === 1) {
        const updateArticle = {
          state: articleObj.state
        }
        await NewsService.updateArticle(editPath, updateArticle)
        ctx.body = {
          status: 200,
          msg: '文章状态修改成功',
          data: null
        }
      } else if ('coverImg' in articleObj) {
        const updateArticle = {
          news_title: articleObj.title,
          news_desc: articleObj.description,
          cover_img: articleObj.coverImg,
          news_content: articleObj.content,
          type: articleObj.category
        }
        await NewsService.updateArticle(editPath, updateArticle)
        ctx.body = {
          status: 200,
          msg: '文章修改成功',
          data: null
        }
      } else {
        const updateArticle = {
          news_title: articleObj.title,
          news_desc: articleObj.description,
          news_content: articleObj.content,
          type: articleObj.category
        }
        await NewsService.updateArticle(editPath, updateArticle)
        ctx.body = {
          status: 200,
          msg: '文章修改成功',
          data: null
        }
      }
    }
  },
  deleteArticle: async ctx => {
    const deletePath = ctx.request.path.substring(22)
    await NewsService.deleteArticle(deletePath)
    ctx.body = {
      status: 200,
      msg: '文章删除成功',
      data: null
    }
  }
}
