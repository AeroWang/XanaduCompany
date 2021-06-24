/**
 * @Description:
 * @author Aerowang
 * @date 2021/5/28
 */
const { sequelize, DataTypes } = require("../config/connect") // 引入相关依赖以及数据库
const MenuPermission = sequelize.define(
  "menu_permission", // 数据库中生成的表名(最终会自动在末尾添加s,因此最终数据库中生自动成表名为accounts
  { // 表字段信息配置
    id: {
      type: DataTypes.INTEGER, // 字段类型
      allowNull: false, // 是否允许为空
      autoIncrement: true,
      primaryKey: true, // 是否主键
    },
    parent_id:{
      type: DataTypes.INTEGER, // 字段类型
      allowNull: true, // 是否允许为空
      comment:'父级ID'
    },
    name: {
      type: DataTypes.STRING, // 字段类型
      allowNull: false, // 是否允许为空
      comment:'名称'
    },
    path: {
      type: DataTypes.STRING, // 字段类型
      allowNull: false, // 是否允许为空
      comment:'路径'
    }
  },
  {
    timestamps: true, // 是否自动在数据表中添加数据操作时间
  }
)


module.exports = MenuPermission
