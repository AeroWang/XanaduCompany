const Router = require('koa-router')
const router = new Router()
// const auth = require('../../controllers/auth')
const news = require('../../controllers/articleController')
const product = require('../../controllers/productController')
const job = require('../../controllers/jobController')

const routers = router
  // 新闻
  .get('/newslist', news.newsList)
  .get('/recomNews', news.recommendNews)
  .get('/hotnews', news.hotNews)
  .get('/searchnews/:keyword', news.searchNews)
  .get('/article/:path', news.newsDetail)
  // 产品
  .get('/products', product.productList)
  
  .get('/job-filters', job.jobFilter)
  .post('/job', job.jobList)
  .get('/job/:id', job.getJobDetail)
module.exports = routers
