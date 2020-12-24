const express = require('express');
const router = express.Router();

const {recommendModel,bannerModel} = require('../model/homemode');

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





module.exports = router;