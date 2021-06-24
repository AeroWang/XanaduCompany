const {
  sequelize,
  DataTypes
} = require('../config/connect')
const News = sequelize.define(
  'aw_news',
  {
    news_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false, // 是否允许为空
      autoIncrement: true,
      primaryKey: true, // 是否主键
    },
    cover_img: {
      type: DataTypes.STRING,
      // allowNull: false,
      comment: '新闻列表项封面'
    },
    news_title: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '新闻标题'
    },
    news_desc: {
      type: DataTypes.STRING,
      // allowNull: false,
      allowNull: false,
      comment: '新闻列表项简要描述'
    },
    news_content: {
      type: DataTypes.TEXT,
      // allowNull: false,
      comment: '新闻内容'
    },
    is_hot: {
      type: DataTypes.BOOLEAN,
      // allowNull: false,
      allowNull: false,
      defaultValue: false,
      comment: '新闻是否热门'
    },
    news_path: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '新闻访问路径'
    },
    state: {
      type: DataTypes.BOOLEAN, // 字段类型
      allowNull: false, // 是否允许为空
      defaultValue: false,
      comment: '状态：true/已发布，false/草稿'
    }
  }, {
    timestamps: true,
    
    // 不想要 createdAt
    createdAt: 'publish_time',
    
    // 想要 updatedAt 但是希望名称叫做 updateTimestamp
    updatedAt: 'update_time'
  }
)
// News.sync({force:true}) // 是否自动创建表

module.exports = News
