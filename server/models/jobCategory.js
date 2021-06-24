const { sequelize, DataTypes } = require("../config/connect")
const JobCategory = sequelize.define(
    "aw_job_category",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false, // 是否允许为空
        autoIncrement: true,
        primaryKey: true, // 是否主键
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '职位类别'
      },
      en_name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '职位类别'
      },
      parent: {
        type: DataTypes.INTEGER,
        // allowNull: false,
        defaultValue: null,
        comment: '父级职位类别'
      },
      children: {
        type: DataTypes.INTEGER,
        // allowNull: false,
        defaultValue: null,
        comment: '父级职位类别'
      },
      depth: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
    }, {
      timestamps: true,
      
      // 不想要 createdAt
      createdAt: 'create_time',
      
      // 想要 updatedAt 但是希望名称叫做 updateTimestamp
      updatedAt: 'update_time'
    }
)
// News.sync({force:true}) // 是否自动创建表

module.exports = JobCategory
