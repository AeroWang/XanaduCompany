/**
 * @Description:
 * @author Aerowang
 * @date 2021/5/29
 */
const JobService = require('../../services/admin/jobService')
module.exports = {
  getJobCategory: async ctx => {
    const result = await JobService.getJobCategory()
    const jobCategory = []
    if (result.length > 0) {
      for (const item of result) {
        const tmp = {
          value: item.dataValues.id,
          label: item.dataValues.name,
          parent: item.dataValues.parent
        }
        jobCategory.push(tmp)
      }
      ctx.body = {
        status: 200,
        msg: '获取职位分类成功',
        data: jobCategory
      }
    }
  },
  getCity: async ctx => {
    const result = await JobService.getCity()
    const cityList = []
    if (result.length > 0) {
      for (const item of result) {
        cityList.push(item)
      }
      ctx.body = {
        status: 200,
        msg: '获取职位城市成功',
        data: cityList
      }
    }
  },
  addJob: async ctx => {
    const data = ctx.request.body
    const job = {
      title: data.title,
      job_category: data.jobCategory,
      city: data.city,
      description: data.description,
      requirement: data.requirement
    }
    const tmp = Object.values(job)
    if (tmp.indexOf(undefined) !== -1) {
      ctx.body = {
        status: 'error',
        msg: '发布职位失败',
        data: null
      }
    } else {
      await JobService.addJob(job)
      ctx.body = {
        status: 200,
        msg: '发布职位成功',
        data: null
      }
    }
  },
  deleteJob: async ctx => {
    const deleteId = ctx.url.substring(18)
    const result = await JobService.deleteJob(deleteId)
    if (result === 1) {
      ctx.body = {
        status: 200,
        msg: '删除该职位成功',
        data: null
      }
    } else {
      ctx.body = {
        status: 'error',
        msg: '删除该职位失败',
        data: null
      }
    }
  },
  updateJob: async ctx => {
    const jobId = ctx.url.substring(18)
    const jobObj = ctx.request.body
    const result = await JobService.updateJob(jobId, jobObj)
    if (result[0]===1){
      ctx.body = {
        status: 200,
        msg: '职位修改成功',
        data: null
      }
    }else {
      ctx.body = {
        status: 'error',
        msg: '职位修改失败',
        data: null
      }
    }
  },
  getJobList: async ctx => {
    const params = ctx.query
    const {
      count,
      rows
    } = await JobService.getJobList(params)
    if (count > 0) {
      const jobList = []
      for (let i = 0; i < rows.length; i++) {
        const data = rows[i].dataValues
        data.job_category = data.aw_job_category.name
        delete data.aw_job_category
        data.city = data.aw_city_info.name
        delete data.aw_city_info
        jobList.push(data)
      }
      ctx.body = {
        status: 200,
        msg: '获取成功',
        data: {
          list: jobList,
          total: count,
          limit: 10
        }
      }
    }
  },
  getJobDetail: async ctx => {
    const jobId = ctx.url.substring(18)
    const result = await JobService.getJobDetail(jobId)
    if (result) {
      ctx.body = {
        status: 200,
        msg: '获取职位详情成功',
        data: result.dataValues
      }
    }
  }
}
