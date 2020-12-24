const express = require('express');
const router = express.Router();

const studentModel = require('../model/students');

// // 第一步, 连接数据库
// mongoose.connect('mongodb://localhost:27017/2009', 
//   { useNewUrlParser: true, useUnifiedTopology: true }
// );

// // 判断是否连接成功
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
//   console.log('数据库连接成功');
// });


// 第二部，创建骨架, 如果没有出现在骨架里的字段是不能存到数据库的
// let StudentSchema = mongoose.Schema({
//   name: String,
//   age: Number,
//   sex: Number,
//   phone: String,
//   num: Number,
//   add: String
// });


// // 第三步， 创建模型
// // 第一个参数表示集合名, 一定要是复数
// // 第二个是骨架名
// let studentModel = mongoose.model('students', StudentSchema);

router.get('/get', (req, res, next) => {

  // get请求用req.query接受参数
  // post用req.body接受参数
  // console.log(req.query);
  const { pageCount, pageSize } = req.query;

  // 如果要获取总条数，必须要放在find的外面
  studentModel.count({}, (err, count) => {
    if (err) throw err;
    // 如果find()之后还需要链式调用，需要用到exec方法来写回调函数
    studentModel.find({}).limit(+pageSize).skip((pageCount - 1) * pageSize).exec((err, doc) => {
      if (err) throw err;
      res.json({
        status: 0,
        result: doc,
        count: count
      })
    })
  })
  

  
  // 第四步， 查询， 根据模型进行查询
  // studentModel.find({}, (err, doc) => {
  //   // console.log(doc);
  //   if (err) throw err;
  //   res.json({
  //     status: 0,
  //     result: doc
  //   })
  // })
})



router.post('/add', (req, res, next) => {
  // console.log(req.body);
  // 创建实例
  const StudentInstance = new studentModel(req.body);
  StudentInstance.save(err => {
    if (err) throw err;
    res.json({
      status: 0,
      msg: '新增成功'
    })
  })
})



// 删除学员
router.post('/del', (req, res, next) => {
  // console.log(req.body.id)
  // remove方法用来删除
  studentModel.remove({_id: req.body.id}, err => {
    if (err) throw err;
    res.json({
      status: 0,
      msg: '删除成功'
    })
  })
})


// 获取单个学员信息
router.get('/item', (req, res, next) => {
  studentModel.findOne({_id: req.query.id}, (err, doc) => {
    if (err) throw err;
    res.json({
      status: 0,
      result: doc
    })
  })
})


// 更新学员信息
router.post('/edit', (req, res, next) => {
  // console.log(req.body)
  const obj = {...req.body};
  delete obj.id;
  studentModel.updateOne({_id: req.body.id}, obj, (err) => {
    if (err) throw err;
    res.json({
      status: 0,
      msg: '删除成功'
    })
  })
})


module.exports = router;