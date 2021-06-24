const JobService = require('../services/jobService')
const moment = require('moment') // 时间格式化插件
module.exports = {
  jobFilter: async (ctx) => {
    const result = await JobService.getJobFilter()
    if (result) {
      const job_type_list = []
      for (const subItem of result.jobCategory) {
        const pid = subItem.dataValues.parent
        if (pid === null) {
          job_type_list.push(subItem.dataValues)
        }
        // 筛选含有父级的职位
        for (const item of result.jobCategory) {
          if (pid === item.dataValues.id) {
            item.dataValues.children = []
            item.dataValues.children.push(subItem.dataValues)
          }
        }
      }
      // 城市列表
      const city_list = []
      for (const item of result.cityInfo) {
        // console.log(item.dataValues)
        city_list.push(item.dataValues)
      }
      ctx.body = {
        status: 200,
        msg: '获取成功',
        data: {
          city_list: city_list,
          job_type_list: job_type_list
        }
      }
    } else {
      ctx.body = {
        status: 'error',
        msg: '获取失败'
      }
    }
  },
  jobList: async (ctx) => {
    const params = ctx.request.body
    const {
      count,
      rows
    } = await JobService.getJobList(params)
    if (count > 0) {
      const job_post_list = []
      for (let i = 0; i < rows.length; i++) {
        const data = rows[i].dataValues
        job_post_list.push(data)
      }
      ctx.body = {
        status: 200,
        msg: '获取成功',
        data: {
          job_post_list: job_post_list,
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
  getJobDetail: async ctx => {
    const jobId = ctx.url.substring(16)
    const result = await JobService.getJobDetail(jobId)
    if (result) {
      const temp = result.dataValues
      const publish_time = temp.create_time
      const update_time = temp.update_time
      temp.publish_time = moment(publish_time).format('YYYY-MM-DD')
      temp.update_time = moment(update_time).format('YYYY-MM-DD')
      delete temp.create_time
      const jobDetail = {
        title: temp.title,
        city: temp.aw_city_info.dataValues.name,
        job_category: temp.aw_job_category.dataValues.name,
        description: temp.description,
        requirement: temp.requirement,
        publish_time: temp.publish_time,
        update_time: temp.update_time
      }
      ctx.body = {
        status: 200,
        msg: '获取职位详情成功',
        data: jobDetail
      }
    }
  }
}
