const {
  sequelize,
  DataTypes
} = require('../config/connect') // 引入相关依赖以及数据库
const Role = sequelize.define(
  'aw_role', // 数据库中生成的表名(最终会自动在末尾添加s,因此最终数据库中生自动成表名为accounts
  { // 表字段信息配置
    id: {
      type: DataTypes.INTEGER(11), // 字段类型
      allowNull: false, // 是否允许为空
      autoIncrement: true,
      primaryKey: true, // 是否主键
    },
    name: {
      type: DataTypes.STRING, // 字段类型
      allowNull: false, // 是否允许为空
      comment: '角色名称'
    },
    description: {
      type: DataTypes.STRING, // 字段类型
      allowNull: false, // 是否允许为空
      comment: '角色描述'
    },
    state: {
      type: DataTypes.BOOLEAN, // 字段类型
      allowNull: false, // 是否允许为空
      defaultValue: false,
      comment: '状态：1/正常'
    }
  },
  {
    timestamps: true, // 是否自动在数据表中添加数据操作时间
    // 不想要 createdAt
    createdAt: 'create_time',
    
    // 想要 updatedAt 但是希望名称叫做 updateTimestamp
    updatedAt: 'update_time'
  }
  // {
  //   tableName: 'account'
  // }
)

// Account.sync({force:true}) // 是否自动创建表

module.exports = Role
