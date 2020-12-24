const express = require('express');
const router = express.Router();
const usersModel = require('../model/users')




router.post('/register', (req, res, next) => {
 const register = new usersModel(req.body);
  // usersModel.find({}, (err, doc) => {
  // if (err) throw err;
  // // console.log(doc)
  //  for(item of doc){
  //   if(item.name==req.body.name){
  usersModel.findOne({name:req.body.name}, (err, doc) => {
    if (err) throw err;
    if (doc) {
      if(req.body.mima==doc.mima){
        res.json({
          status: 0,
          result: doc
        })
      }else{
        res.json({
          status: 0,
          msg: '密码错误',
        })
      }
    } else {
    register.save(err => {
    if (err) throw err;
    usersModel.findOne({name:req.body.name}, (err, doc) => {
      if (err) throw err;
      res.json({
        status: 0,
        msg: '新增成功',
        result:doc
      })
    })
   
  })
    }
  })
 
 
  
})

module.exports = router;