const {
  sequelize,
  DataTypes
} = require('../config/connect')
const recommendNews = sequelize.define(
  'aw_recommend_news',
  {
    recommend_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false, // 是否允许为空
      autoIncrement: true,
      primaryKey: true, // 是否主键
    }
  },
  {
    timestamps: true,
    
    // 不想要 createdAt
    createdAt: 'publish_time',
    
    // 想要 updatedAt 但是希望名称叫做 updateTimestamp
    updatedAt: 'update_time'
    // tableName: 'aw_news'
  }
)
// recommendNews.sync({ force: true }) // 是否自动创建表

module.exports = recommendNews
