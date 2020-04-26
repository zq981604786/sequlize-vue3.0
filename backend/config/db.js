const Sequelize = require('sequelize')
const config = require('./database.json').development

var sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  timezon: '+08:00',
  pool: {
      max: 5,
      min: 0,
      idle: 30000
  }
})
sequelize
  .authenticate()
  .then(() => {
    console.log('数据库连接成功')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })
// 根据 model自动创建表
sequelize
  .sync()
  .then(() => {
    console.log('init db ok')
  })
  .catch(err => {
    console.log('init db error', err)
  })
module.exports = sequelize