const {
  sequelize,
  DataTypes
} = require('../config/connect')
const Permission = sequelize.define(
  'aw_permission',
  {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '权限请求路径'
    },
    method:{
      type: DataTypes.STRING,
      allowNull: false,
      comment: '请求方法'
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '权限描述'
    },
    state: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: '状态：1/正常'
    }
  },
  {
    timestamps: true,
    createdAt: 'create_time',
    updatedAt: 'update_time'
  }
  // {
  //   tableName: 'account'
  // }
)

// Account.sync({force:true}) // 是否自动创建表

module.exports = Permission


