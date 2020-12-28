const express = require('express');
const router = express.Router();

const {recommendModel,bannerModel,messageModel,moretops,subject,detail,userinfo} = require('../model/homemode');
//推荐页
router.get('/recommend',(req,res,next)=>{
  recommendModel.find({}, (err, doc) => {
      console.log(doc);
      if (err) throw err;
      res.json({
        status: 0,
        result: doc
      })
    })
})
router.post('/recommend',(req,res,next)=>{
  const{pageCount,pageSize}=req.body
  recommendModel.count({}, (err, count) => {
    if (err) throw err;
    // 如果find()之后还需要链式调用，需要用到exec方法来写回调函数
    recommendModel.find({}).limit(+pageSize).skip((pageCount - 1) * pageSize).exec((err, doc) => {
      if (err) throw err;
      res.json({
        status: 0,
        result: doc,
        count: count
      })
      
    })
  })
})
//轮播图
router.get('/banner',(req,res,next)=>{
  bannerModel.find({}, (err, doc) => {
      console.log(doc);
      if (err) throw err;
      res.json({
        status: 0,
        result: doc
      })
    })
})
var d = new Date()
//消息列表接口
router.get('/message',(req,res,next)=>{
  messageModel.find({}, (err, doc) => {
      console.log(doc);
      if (err) throw err;
      res.json({
        status: 0,
        result: doc,
        time:d, 
      })
    })
})
//moretops 更多列表
router.get('/moretops',(req,res,next)=>{
  moretops.find({}, (err, doc) => {
      console.log(doc);
      if (err) throw err;
      res.json({
        status: 0,
        result: doc 
      })
    })
})
//mars 专题
router.get('/subject',(req,res,next)=>{
  subject.find({}, (err, doc) => {
      console.log(doc);
      if (err) throw err;
      res.json({
        status: 0,
        result: doc 
      })
    })
})
//详情页
router.get('/detail', (req, res, next) => {
  detail.findOne({id: req.query.id}, (err, doc) => {
    if (err) throw err;
    res.json({
      status: 0,
      result: doc
    })
  })
})
//获得个人信息
let  oneinfo={
  name:"蔡徐坤",
  img:"http://42.192.148.146:3000/images/mine/img5.png"
}

router.post('/userinfo',(req,res,next)=>{
  const newoneinfo = new usersModel(oneinfo);
  userinfo.findOne({_id: req.query.token}, (err, doc) => {
    if (err) throw err;
    if(doc){
      res.json({
        status: 0,
        result: doc
      })
    }else{
      newoneinfo.save(err=>{
        if(err) throw err;
        res.json({
          status: 0,
          msg: '新增成功'
        })
      }) 
    }
  })
})
//





module.exports = router;