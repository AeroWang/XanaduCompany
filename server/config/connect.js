// 在connect.js文件中,使用sequelize连接数据库
const config = require('./dbinfo') // 引入数据库配置信息
const { Sequelize, DataTypes ,Op} = require("sequelize") // 引入sequelize依赖

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      dialect: config.dialect,
      dialectOptions: {
        dateStrings: true,
        typeCast: true
      },
      host: config.host,
      port: config.port,
      logging: config.logging,
      pool: { // 连接池配置
        min: 0, // 最小连接数
        max: 5, // 最大链接数
        idle: 30000,
        acquire: 60000,
      },
      define: {
        // 字段以下划线（_）来分割（默认是驼峰命名风格）
        underscored: true
      },
      timezone: '+08:00'
    }
)

module.exports = {
  sequelize,// 将sequelize暴露出接口方便Model调用
  DataTypes,
  Op
}


