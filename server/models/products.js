const {
  sequelize,
  DataTypes
} = require('../config/connect')
const Products = sequelize.define(
  'aw_products',
  {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false, // 是否允许为空
      autoIncrement: true,
      primaryKey: true, // 是否主键
    },
    cover_img: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '产品图片'
    },
    product_logo: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '产品logo'
    },
    product_name: {
      type: DataTypes.STRING,
      // allowNull: false,
      comment: '产品英文名称'
    },
    product_title: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '产品中文名称'
    },
    product_desc: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '产品描述'
    },
    product_sub_desc: {
      type: DataTypes.STRING,
      // allowNull: false,
      comment: '产品详细描述'
    },
    product_link: {
      type: DataTypes.STRING,
      comment: '产品详情链接'
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

module.exports = Products
