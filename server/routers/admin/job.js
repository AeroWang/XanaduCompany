/**
 * @Description:
 * @author Aerowang
 * @date 2021/5/29
 */
const Router = require('koa-router')
const router = new Router()
const job = require('../../controllers/admin/jobController')
const routers = router
  .get('/job_category', job.getJobCategory)
  .get('/city', job.getCity)
  .post('/job', job.addJob)
  .get('/job', job.getJobList)
  .get('/job/:id', job.getJobDetail)
  .delete('/job/:id', job.deleteJob)
  .put('/job/:id', job.updateJob)
module.exports = routers
