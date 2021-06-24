const {
  Job,
  JobCategory,
  CityInfo,
  Op
} = require('../models/index')

class JobService {
  async getJobFilter () {
    const jobCategory = await JobCategory.findAll({
      attributes: { exclude: ['create_time', 'update_time'] },
    })
    const cityInfo = await CityInfo.findAll({
      attributes: { exclude: ['create_time', 'update_time'] },
    })
    // 返回对象：职位类别与城市
    return {
      jobCategory: jobCategory,
      cityInfo: cityInfo
    }
  }
  
  // 根据查询参数获取职位列表
  async getJobList (params) {
    // console.log(params.keyword)
    // 职位类别、城市、关键词 均为空
    if (params.job_category_id_list.length === 0 && params.location_code_list.length === 0 && !params.keyword) {
      return Job.findAndCountAll({
        include: [{
          model: CityInfo,
          attributes: ['name', 'code']
        }, {
          model: JobCategory,
          attributes: ['name', 'en_name']
        }],
        limit: parseInt(params.pageSize),
        // 跳过实例数目
        offset: (params.currentPage - 1) * parseInt(params.pageSize),
      })
    }
    // 职位类别、城市、关键词 均不为空
    else if (params.job_category_id_list.length > 0 && params.location_code_list.length > 0 && !!params.keyword) {
      const job_category_id = await JobCategory.findAll({
        where: {
          id: params.job_category_id_list
        }
      })
      const location_code = await CityInfo.findAll({
        where: {
          code: params.location_code_list
        }
      })
      const job_category_id_list = []
      const location_code_list = []
      for (const item of job_category_id) {
        job_category_id_list.push(item.dataValues.id)
      }
      for (const item of location_code) {
        location_code_list.push(item.dataValues.code)
      }
      // console.log(job_category_id_list)
      return Job.findAndCountAll({
        where: {
          [Op.and]: [
            {
              city: location_code_list,
            },
            {
              job_category: job_category_id_list
            },
            {
              title: {
                [Op.substring]: params.keyword
              }
            }
          ],
        },
        include: [{
          model: CityInfo,
          attributes: ['name', 'code']
        }, {
          model: JobCategory,
          attributes: ['name', 'en_name']
        }],
        limit: parseInt(params.pageSize),
        // 跳过实例数目
        offset: (params.currentPage - 1) * parseInt(params.pageSize),
      })
    }
    // 职位类别、城市不为空，关键词为空
    else if (params.job_category_id_list.length > 0 && params.location_code_list.length > 0 && !params.keyword) {
      const job_category_id = await JobCategory.findAll({
        where: {
          id: params.job_category_id_list
        }
      })
      const location_code = await CityInfo.findAll({
        where: {
          code: params.location_code_list
        }
      })
      const job_category_id_list = []
      const location_code_list = []
      for (const item of job_category_id) {
        job_category_id_list.push(item.dataValues.id)
      }
      for (const item of location_code) {
        location_code_list.push(item.dataValues.code)
      }
      // console.log(job_category_id_list)
      return Job.findAndCountAll({
        where: {
          [Op.and]: [
            {
              city: location_code_list,
            },
            {
              job_category: job_category_id_list
            }
          ],
        },
        include: [{
          model: CityInfo,
          attributes: ['name', 'code']
        }, {
          model: JobCategory,
          attributes: ['name', 'en_name']
        }],
        limit: parseInt(params.pageSize),
        // 跳过实例数目
        offset: (params.currentPage - 1) * parseInt(params.pageSize),
      })
    }
    // 职位类别不为空，城市为空、关键词为空
    else if (params.job_category_id_list.length > 0 && params.location_code_list.length <= 0 && !params.keyword) {
      const job_category_id = await JobCategory.findAll({
        where: {
          id: params.job_category_id_list
        }
      })
      const job_category_id_list = []
      for (const item of job_category_id) {
        job_category_id_list.push(item.dataValues.id)
      }
      // console.log(job_category_id_list)
      return Job.findAndCountAll({
        where: {
          job_category: job_category_id_list
        },
        include: [{
          model: CityInfo,
          attributes: ['name', 'code']
        }, {
          model: JobCategory,
          attributes: ['name', 'en_name']
        }],
        limit: parseInt(params.pageSize),
        // 跳过实例数目
        offset: (params.currentPage - 1) * parseInt(params.pageSize),
      })
    }
    // 职位类别不为空，城市为空、关键词不为空
    else if (params.job_category_id_list.length > 0 && params.location_code_list.length <= 0 && !!params.keyword) {
      const job_category_id = await JobCategory.findAll({
        where: {
          id: params.job_category_id_list
        }
      })
      const job_category_id_list = []
      for (const item of job_category_id) {
        job_category_id_list.push(item.dataValues.id)
      }
      // console.log(job_category_id_list)
      return Job.findAndCountAll({
        where: {
          job_category: job_category_id_list,
          title: {
            [Op.substring]: params.keyword
          }
        },
        include: [{
          model: CityInfo,
          attributes: ['name', 'code']
        }, {
          model: JobCategory,
          attributes: ['name', 'en_name']
        }],
        limit: parseInt(params.pageSize),
        // 跳过实例数目
        offset: (params.currentPage - 1) * parseInt(params.pageSize),
      })
    }
    // 职位类别为空，城市不为空、关键词为空
    else if (params.job_category_id_list.length <= 0 && params.location_code_list.length > 0 && !params.keyword) {
      const location_code = await CityInfo.findAll({
        where: {
          code: params.location_code_list
        }
      })
      const location_code_list = []
      for (const item of location_code) {
        location_code_list.push(item.dataValues.code)
      }
      return Job.findAndCountAll({
        where: {
          city: location_code_list
        },
        include: [{
          model: CityInfo,
          attributes: ['name', 'code']
        }, {
          model: JobCategory,
          attributes: ['name', 'en_name']
        }],
        limit: parseInt(params.pageSize),
        // 跳过实例数目
        offset: (params.currentPage - 1) * parseInt(params.pageSize),
      })
    }
    // 职位类别为空，城市不为空、关键词不为空
    else if (params.job_category_id_list.length <= 0 && params.location_code_list.length > 0 && !!params.keyword) {
      const location_code = await CityInfo.findAll({
        where: {
          code: params.location_code_list
        }
      })
      const location_code_list = []
      for (const item of location_code) {
        location_code_list.push(item.dataValues.code)
      }
      return Job.findAndCountAll({
        where: {
          city: location_code_list,
          title: {
            [Op.substring]: params.keyword
          }
        },
        include: [{
          model: CityInfo,
          attributes: ['name', 'code']
        }, {
          model: JobCategory,
          attributes: ['name', 'en_name']
        }],
        limit: parseInt(params.pageSize),
        // 跳过实例数目
        offset: (params.currentPage - 1) * parseInt(params.pageSize),
      })
    }
    // 仅关键词不为空
    else {
      return Job.findAndCountAll({
        where: {
          title: {
            [Op.substring]: params.keyword
          }
        },
        include: [{
          model: CityInfo,
          attributes: ['name', 'code']
        }, {
          model: JobCategory,
          attributes: ['name', 'en_name']
        }],
        limit: parseInt(params.pageSize),
        // 跳过实例数目
        offset: (params.currentPage - 1) * parseInt(params.pageSize),
      })
    }
  }
  async getJobDetail (id) {
    return Job.findOne({
      where: {
        id: id
      },
      include: [{
        model: JobCategory,
        attributes: ['name','id','parent']
      },
        {
          model: CityInfo,
          attributes: ['name','code']
        }]
    })
  }
}

module.exports = new JobService()
