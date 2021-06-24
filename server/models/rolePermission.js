const {
  sequelize,
  DataTypes
} = require('../config/connect') // 引入相关依赖以及数据库
const RolePermission = sequelize.define(
  'aw_role_permission',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    state: {
      type: DataTypes.INTEGER('tiny'),
      allowNull: false,
      defaultValue: '1',
      comment: '状态：1/正常'
    }
  },
  {
    timestamps: true, // 是否自动在数据表中添加数据操作时间
    createdAt: 'create_time',
    updatedAt: 'update_time'
  }
)


module.exports = RolePermission
