const {
  sequelize,
  DataTypes
} = require('../config/connect')
const NewsType = sequelize.define(
  'aw_news_type',
  {
    type_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false, // 是否允许为空
      autoIncrement: true,
      primaryKey: true, // 是否主键
    },
    type_name: {
      type: DataTypes.STRING,
      allowNull: false, // 是否允许为空
    }
  },
  {
    timestamps: true,
    createdAt: 'create_time',
    updatedAt: 'update_time'
  }
)

module.exports = NewsType
