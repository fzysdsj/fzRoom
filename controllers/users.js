/* GET users listing. */
var User = require("../models/users.js");
//用户后台列表页
//用户登出
exports.logout = function (req, res, next) {
  if (!req.session.user) {
    console.log("未登录");
    return res.redirect('/signin');
  }
  else {
    // 清空 session 中用户信息
    req.session.user = null;
    // 登出成功后跳转到主页
    console.log("删除用户信息成功");
    console.log(req.session.user);
    res.redirect('/home');
  }
};
//更新用户信息
exports.update = function(req,res,next){
  res.render('userupdate');
  //尚未实现
};
//查询用户信息
exports.search = function(req,res,next){
  //尚未实现
};
exports.delete = function(req,res,next){

};
exports.list =function(req,res,next){
  res.render('userList');
}
exports.profile = function(req,res,next){
  res.render('profile');
}