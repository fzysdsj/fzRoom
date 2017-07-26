var express = require('express');
var User = require("../models/users.js");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signin',{ errMsg: '' });
});

router.post("/",function(req, res) {
    //获取form表单提交的登录数据
    var username = req.body.username;
    var password = req.body.password;
    console.log(req.session.username);
    var loginUser = new User({
      username : username,
      userpwd : password
    });
    //通过用户名取到用户信息
    loginUser.userInfo(function(err,result){
      if(err){
        req.flash('error', '未知错误');
    return res.redirect('/signin');
      }
      if(result == ''){
          req.flash('error', '用户不存在');
    return res.redirect('/signin');
      }
        if(req.session.user){
          if(req.session.user.username ==username){
           req.flash('error', '用户已登录');
         return res.redirect('/signin');
          }
        else{
          req.flash('error', '已有用户登录，请先退出当前用户');
         return res.redirect('/signin');
        }
        }
      else{
        //判断用户密码是否填写正确  演示没做加密，等有时间再加
        if(result[0]['userpwd'] == password){
          var user = {'username':username,
          'userpwd':password,
          'usernick':result[0]['usernick']
          };
          req.session.user = user;//保存用户session信息
          //等级大于1000的，为管理员，直接进入后台页面
          if(result[0]['userclass']>1000){
            res.redirect('/backend');
          }else{
          res.redirect('/home');
          }
        }
        else{
            req.flash('error', '密码错误');
         return res.redirect('/signin');
        }
      }
     });
});

module.exports = router;
