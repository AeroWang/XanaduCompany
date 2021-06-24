const { sequelize, DataTypes } = require("../config/connect")
const CityInfo = sequelize.define(
    "aw_city_info",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '城市名称'
      },
      en_name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '城市名称'
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '城市代码',
        primaryKey: true, // 是否主键
      }
    }, {
      timestamps: true,
      
      // 不想要 createdAt
      createdAt: 'create_time',
      
      // 想要 updatedAt 但是希望名称叫做 updateTimestamp
      updatedAt: 'update_time'
    }
)
// News.sync({force:true}) // 是否自动创建表

module.exports = CityInfo
