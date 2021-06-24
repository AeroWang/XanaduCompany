const {
  Account,
  Role
} = require('../models/index') // 引入account表
const {
  sequelize
} = require('../config/connect')

class AccountService {
  // 根据id查询
  async getAccountById(id) {
    return Account.findAll({
      where: {
        id: id
      },
    })
  }
  
  // 根据用户名查询
  async getAccountByUserName(username) {
    return Account.findAll({
      where: {
        username,
      },
    })
  }
  
  // 新增账户
  async createAccount(account) {
    return Account.create(account)
  }
  
  async getAccountList(params) {
    return Account.findAndCountAll({
      attributes: { exclude: ['password'] },
      include: {
        model: Role
      },
      limit: parseInt(params.pagesize),
      // 跳过实例数目
      offset: (params.pagenum - 1) * parseInt(params.pagesize)
    })
  }
  
  async getAccountListByDate() {
    return Account.findAll({
      group: 'roleId'
    })
  }
  
  // 更新账户
  async updateAccount(accountId, data) {
    return Account.update(data, {
      where: {
        id: accountId
      },
    })
  }
  
  // 删除账户
  async deleteAccount(id) {
    return Account.destroy({
      where: {
        id: id
      },
    })
  }
  
  // 查询用户信息
  async getAccountInfo(username) {
    return Account.findAll({
      where: {
        username,
      },
      include: [{
        model: Role,
        attributes: ['name', 'description']
      }]
    })
  }
}

module.exports = new AccountService()
