const sequelize = require('../../config/db')
const { Model, DataTypes } = require('sequelize');

class Journal extends Model {}
Journal.init({
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true,
    unique:true,
    allowNull: false
  },
  row:{
    type:DataTypes.STRING,
    allowNull: false
  },
  status:{
    type:DataTypes.STRING,
    allowNull: false
  },
  name:{
    type:DataTypes.STRING,
    allowNull: false
  },
  describe:{
    type:DataTypes.STRING,
    allowNull: false
  },
  programme:{
    type:DataTypes.STRING,
    allowNull: false
  },
},{sequelize,modelName:'Journal'})
// 同步表结构
// Journal.sync()   // 如果表存在 不会刷新结构
// Journal.sync({ force: true })
module.exports = Journal



// sequelize.sync().then(() => {
//   Journal.create({
//     row:'111'
//   }).then(res => {
//     console.log(res.toJSON())
//   })
// })