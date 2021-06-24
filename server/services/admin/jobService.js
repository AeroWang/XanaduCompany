/**
 * @Description:
 * @author Aerowang
 * @date 2021/5/29
 */
const {
  Job,
  JobCategory,
  CityInfo
} = require('../../models/index')

class JobService {
  async getJobCategory () {
    return JobCategory.findAll({
      attributes: { exclude: ['create_time', 'update_time'] },
    })
  }
  
  async getCity () {
    return CityInfo.findAll({
      attributes: { exclude: ['create_time', 'update_time'] },
    })
  }
  
  async addJob (data) {
    return Job.create(data)
  }
  
  async deleteJob (id) {
    return Job.destroy({
      where: {
        id: id
      }
    })
  }
  
  async updateJob (id, value) {
    return Job.update(value, {
      where: {
        id: id
      }
    })
  }
  
  async getJobList (params) {
    if (params.category) {
      return Job.findAndCountAll({
        where: {
          type: params.category
        },
        limit: parseInt(params.pagesize),
        // 跳过实例数目
        offset: (params.pagenum - 1) * parseInt(params.pagesize),
        include: [{
          model: JobCategory,
          attributes: ['name']
        },
          {
            model: CityInfo,
            attributes: ['name']
          }]
      })
    } else {
      return Job.findAndCountAll({
        limit: parseInt(params.pagesize),
        // 跳过实例数目
        offset: (params.pagenum - 1) * parseInt(params.pagesize),
        include: [{
          model: JobCategory,
          attributes: ['name']
        },
          {
            model: CityInfo,
            attributes: ['name']
          }]
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
        attributes: ['name', 'id', 'parent']
      },
        {
          model: CityInfo,
          attributes: ['name', 'code']
        }]
    })
  }
}

module.exports = new JobService()
