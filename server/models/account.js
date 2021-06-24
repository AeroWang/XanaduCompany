const { sequelize, DataTypes } = require("../config/connect") // 引入相关依赖以及数据库
const Account = sequelize.define(
    "aw_accounts", // 数据库中生成的表名(最终会自动在末尾添加s,因此最终数据库中生自动成表名为accounts
    { // 表字段信息配置
      id: {
        type: DataTypes.INTEGER(11), // 字段类型
        allowNull: false, // 是否允许为空
        autoIncrement: true,
        primaryKey: true, // 是否主键
      },
      name: {
        type: DataTypes.STRING, // 字段类型
        allowNull: true, // 是否允许为空
        comment: '姓名'
      },
      username: {
        type: DataTypes.STRING, // 字段类型
        allowNull: false, // 是否允许为空
      },
      password: {
        type: DataTypes.STRING, // 字段类型
        allowNull: false, // 是否允许为空
      },
      avatar:{
        type: DataTypes.STRING(1500), // 字段类型
        allowNull: true, // 是否允许为空
        defaultValue:'http://localhost:3000/upload/20210612/16234847490027294.png'
      },
      sex: {
        type: DataTypes.STRING, // 字段类型
        allowNull: true, // 是否允许为空
        comment: '性别'
      },
      department: {
        type: DataTypes.STRING, // 字段类型
        allowNull: true, // 是否允许为空
        comment: '部门'
      },
      location: {
        type: DataTypes.STRING, // 字段类型
        allowNull: true, // 是否允许为空
        comment: '位置'
      },
      introduction:{
        type: DataTypes.STRING, // 字段类型
        allowNull: true, // 是否允许为空
        defaultValue:'个人介绍'
      }
    },
    {
      timestamps: true, // 是否自动在数据表中添加数据操作时间
    }
    // {
    //   tableName: 'account'
    // }
)

// Account.sync({force:true}) // 是否自动创建表

module.exports = Account
