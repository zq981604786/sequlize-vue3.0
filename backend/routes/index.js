var express = require('express');
var router = express.Router();
const Journal = require('../db/models/Journal')
/* GET home page. */
router
.get('/', function(req, res, next) {
  let { currentPage = 1,pageSize=20 } = req.query
  let offset = (currentPage - 1) * pageSize;
  Journal.findAndCountAll({
    offset,
    limit: Number(pageSize),
    order:[
      ['createdAt','desc']
    ]
  }).then(doc => {
    res.send({count:doc.count,dataList:doc.rows})
  })
})
.post('/', function(req, res, next) {
  Journal.create(req.body).then(doc => {
    console.log(doc)
    res.send(doc)
  })
})
.put('/', function(req, res, next) {
  let params = req.body
  console.log('1111', params)
  Journal.update(params,{where:{id:params.id}}).then(doc => {
    res.send(doc)
  })
})
.delete('/', function(req, res, next) {
  Journal.destroy({
    where:{
      id:'1'
    }
  }).then(doc => {
    console.log(doc)
    res.send(doc)
  })
})


module.exports = router;
