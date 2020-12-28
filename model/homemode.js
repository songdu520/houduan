const mongoose = require('mongoose');

// 第二部，创建骨架, 如果没有出现在骨架里的字段是不能存到数据库的
let homeSchema = mongoose.Schema({
 
});


// 第三步， 创建模型
// 第一个参数表示集合名, 一定要是复数
// 第二个是骨架名
let recommendModel = mongoose.model('recommends', homeSchema);

let bannerModel = mongoose.model('banners', homeSchema);
let messageModel = mongoose.model('messages', homeSchema);
let moretops = mongoose.model('moretops', homeSchema);
let subject = mongoose.model('subjects', homeSchema);
let detail = mongoose.model('details', homeSchema);
let userinfo = mongoose.model('userinfoes', homeSchema);

module.exports = {recommendModel,bannerModel,messageModel,moretops,subject,detail,userinfo};