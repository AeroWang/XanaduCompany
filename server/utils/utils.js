const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const token_key = 'Aerowang' // 自定义token校验令牌
const saltRounds = 10 // 加密密码计算强度

// 生成token
const createToken = (userInfo, timeout = '5h') => {
  /*
    id:用户id,
    timeout:token过期时间
  */
  const token_info = {
    userInfo,
    ctime: new Date().getTime(), //token创建时间戳
  }
  const token = jwt.sign(token_info, token_key, { expiresIn: timeout }) // 生成token
  return token
}

// 校验token
const varifyToken = async old_token => {
  try {
    const userInfo = await jwt.verify(old_token.split(' ')[1], 'Aerowang')
    return userInfo
  } catch (err) {
    // token已过期
    // return (console.log('varifyToken >>> ' + err))
    return false
  }
}

// 密码加密
const encrypted = password => {
  return new Promise((resolve) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          console.log(err)
        }
        resolve(hash)
      })
    })
  })
}

// 校验密码
const verifyPwd = (password, hash) => {
  /*
    password: 需要校验的密码
    hash: 数据库中已加密的密码
  */
  return new Promise((resolve) => {
    bcrypt.compare(password, hash, (err, res) => {
      if (err) {
        console.log(err)
      }
      resolve(res)
    })
  })
}

module.exports = {
  verifyPwd,
  encrypted,
  varifyToken,
  createToken,
}
