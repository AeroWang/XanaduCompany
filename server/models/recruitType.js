// const { sequelize, DataTypes } = require("../config/connect")
// const RecruitType = sequelize.define(
//     "aw_recruit_type",
//     {
//       id: {
//         type: DataTypes.INTEGER(11),
//         allowNull: false, // 是否允许为空
//         autoIncrement: true,
//         primaryKey: true, // 是否主键
//       },
//       cover_img: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         comment: '产品图片'
//       }
//     }, {
//       timestamps: true,
//
//       // 不想要 createdAt
//       createdAt: 'create_time',
//
//       // 想要 updatedAt 但是希望名称叫做 updateTimestamp
//       updatedAt: 'update_time'
//     }
// )
// // News.sync({force:true}) // 是否自动创建表
//
// module.exports = RecruitType
