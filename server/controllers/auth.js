const AccountService = require('../services/accountService')
const {
  verifyPwd,
  encrypted,
  createToken,
  varifyToken
} = require('../utils/utils')
const moment = require('moment') // 时间格式化插件
module.exports = {
  // login
  login: async (ctx) => {
    const {
      username,
      password
    } = ctx.request.body
    // console.log(ctx.request.body)
    if (!username || !password) {
      ctx.body = {
        status: 'error',
        msg: '用户名与密码不能为空'
      }
      return
    }
    const count = await AccountService.getAccountByUserName(username)
    const roleInfo = await AccountService.getAccountInfo(username)
    
    if (count.length > 0 && roleInfo.length > 0) {
      const encryPwd = count[0].dataValues.password
      let roleName = []
      roleName.push(roleInfo[0].dataValues.aw_role.dataValues.name)
      const userInfo = {
        id: count[0].dataValues.id,
        roles: roleName,
        name: count[0].dataValues.username,
        avatar: count[0].dataValues.avatar,
      }
      const flag = await verifyPwd(password, encryPwd)
      const token = createToken(userInfo)
      // console.log(userInfo)
      if (flag) {
        ctx.body = {
          status: 200,
          msg: '登录成功',
          data: {
            username,
            token
          }
        }
      } else {
        ctx.status = 400
        ctx.body = {
          status: 'error',
          msg: '密码错误'
        }
      }
    } else {
      ctx.body = {
        status: 'error',
        msg: '请检查账户名'
      }
    }
  },
  logout: async (ctx) => {
    ctx.body = {
      status: 200,
      msg: '已成功退出',
      data: null
    }
  },
  // 注册、添加用户
  addAccount: async (ctx) => {
    const accountObj = ctx.request.body
    if (!accountObj.role_id) {
      // 个人注册时统一分配角色为 normal（普通用户）
      accountObj.role_id = 3
    }
    const count = await AccountService.getAccountByUserName(accountObj.username)
    if (count.length > 0) {
      ctx.body = {
        status: 'error',
        msg: '当前用户名已存在'
      }
    } else {
      accountObj.password = await encrypted(accountObj.password)
      const result = await AccountService.createAccount(accountObj)
      if (result) {
        ctx.body = {
          status: 200,
          msg: '注册成功'
        }
      } else {
        ctx.body = {
          status: 'error',
          msg: '注册失败'
        }
      }
    }
  },
  
  getAccountList: async ctx => {
    const params = ctx.query
    const {
      count,
      rows
    } = await AccountService.getAccountList(params)
    if (count > 0) {
      const accountList = []
      for (let i = 0; i < rows.length; i++) {
        const data = rows[i].dataValues
        accountList.push(data)
      }
      ctx.body = {
        status: 200,
        msg: '获取成功',
        data: {
          list: accountList,
          total: count,
          limit: 10
        }
      }
    }
  },
  getAccountListByDate: async ctx => {
    const result = await AccountService.getAccountListByDate()
    console.log(result)
    ctx.body = {
      status: 200,
      msg: '获取成功',
      data: {
        result
      }
    }
  },
  // 更新
  updateAccount: async (ctx) => {
    const accountId = ctx.url.substring(22)
    const data = ctx.request.body
    console.log(data)
    const count = await AccountService.getAccountById(accountId)
    if (count.length > 0) {
      if (accountId === '1') {
        ctx.body = {
          status: 1000,
          msg: '超级管理员不可被修改',
          data: null
        }
      } else {
        if (data.password) {
          data.password = await encrypted(data.password)
        }
        const result = await AccountService.updateAccount(accountId, data)
        if (result[0] === 1) {
          ctx.body = {
            status: 200,
            msg: '更新账户信息成功',
          }
        } else {
          ctx.body = {
            status: 'error',
            msg: '更新账户信息失败',
          }
        }
      }
    } else {
      ctx.body = {
        status: 'error',
        msg: '不存在此id用户',
      }
    }
    
    // const count = await AccountService.getAccountById(account.id)
    // if (count.length > 0) {
    //   account.password = await encrypted(account.password) // 加密密码
    //   await AccountService.updateAccount(account) // 更新数据
    //   ctx.body = {
    //     status: 'success',
    //     msg: '更新成功',
    //   }
    // } else {
    //   ctx.body = {
    //     status: 'error',
    //     msg: '不存在此id用户',
    //   }
    // }
  },
  // 删除
  deleteAccount: async (ctx) => {
    const accountId = ctx.url.substring(22)
    const count = await AccountService.getAccountById(accountId)
    let token = ctx.request.headers['authorization']
    const tokenInfo = await varifyToken(token)
    // console.log(tokenInfo)
    const userInfo = tokenInfo.userInfo
    // console.log(userInfo.id)
    // console.log(count[0].dataValues.id)
    // console.log(accountId)
    if (count.length > 0) {
      if (parseInt(userInfo.id) === parseInt(count[0].dataValues.id)) {
        ctx.body = {
          status: 1000,
          msg: '不可删除自己',
          data: null
        }
      } else if (parseInt(accountId) === 1) {
        ctx.body = {
          status: 1000,
          msg: '超级管理员不可被删除',
          data: null
        }
      } else {
        const result = await AccountService.deleteAccount(accountId)
        if (result === 1) {
          ctx.body = {
            status: 200,
            msg: '删除成功',
          }
        } else {
          ctx.body = {
            status: 'error',
            msg: '删除失败',
          }
        }
      }
    } else {
      ctx.body = {
        status: 'error',
        msg: '此id用户不存在',
      }
    }
  },
  // 获取用户信息，在 token 中携带
  getAccountInfo: async (ctx) => {
    let token = ctx.request.headers['authorization']
    const tokenInfo = await varifyToken(token)
    // console.log(tokenInfo)
    const userInfo = tokenInfo.userInfo
    if (tokenInfo) {
      ctx.body = {
        status: 200,
        msg: '登录成功',
        data: {
          userInfo
        }
      }
    }
  },
  
  // 获取用户信息
  getAccountInfoById: async (ctx) => {
    const accountId = ctx.url.substring(19)
    const count = await AccountService.getAccountById(accountId)
    const userInfo = count[0].dataValues
    const date = count[0].dataValues.createdAt
    if (count.length > 0) {
      ctx.body = {
        status: 200,
        msg: '登录成功',
        data: {
          avatar: userInfo.avatar,
          name: userInfo.name,
          accountName: userInfo.username,
          sex: userInfo.sex,
          description: userInfo.introduction,
          location: userInfo.location,
          department: userInfo.department,
          createTime: moment(date).format('YYYY-MM-DD')
        }
      }
    }
  }
}
