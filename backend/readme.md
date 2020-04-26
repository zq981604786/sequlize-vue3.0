# 导入sequelize sequelize-cli mysql2
cnpm i -S sequelize sequelize-cli mysql2 cross-env


# 使用sequelize-cli建表和模型

## 新建 .sequelizerc文件
```js
const path = require('path');
module.exports = {
  'config': path.resolve('config', 'database.json'),
  'models-path': path.resolve('db', 'models'),
  'seeders-path': path.resolve('db', 'seeders'),
  'migrations-path': path.resolve('db', 'migrations')
}
```
## 初始化创建db环境
./node_modules/.bin/sequelize init

## 创建数据库
./node_modules/.bin/sequelize db:create