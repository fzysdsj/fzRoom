var express = require('express');
var User = require("../models/users.js");
var fs = require('fs');
var path = require('path');
var formidable = require('formidable');
var router = express.Router();
/* GET home page. */
var regExpname = /[A-Za-z0-9_\-\u4e00-\u9fa5]{6,12}/;
var regExppwd = /[A-Za-z0-9_\-\u4e00-\u9fa5]{6,12}/;
var regExpemail = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
//手机
var regExpPhone = /0?(13|14|15|18)[0-9]{9}/;
router.get('/', function (req, res, next) {
  res.render('signup', {
    errMsg: ""
  });
});
router.post('/', function (req, res) {
  // var userId = Math.ceil(Math.random(0, 1) * 1000000);
  // var userid = userId;
  console.log('开始文件上传....');
   var form = new formidable.IncomingForm();
    //设置编辑
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = "../public/images/";
    //保留后缀
    form.keepExtensions = true;
    //设置单文件大小限制    
    form.maxFieldsSize = 2 * 1024 * 1024;
    
  var username = req.body.username;
  var password = req.body.password;
  var repassword = req.body.repassword;
  var usernick = req.body.usernick;
  var userphone = req.body.userphone;
  var useremail = req.body.useremail;
  var userhome = req.body.userhome;
  var usersex = req.body.usersex;
  var checkbox = req.body.checkbox;
  var useravatar =req.body.useravatar;
  console.log('checkbox:' + checkbox);
  console.log('useravatar:' + useravatar);
  console.log('usersex:' + usersex);

  var userclass = 0;
  //   try {
  //     if (!(username.length >= 1 && username.length <= 10)) {
  //         throw new Error('名字请限制在 1-10 个字符');
  //     }
  //     // if (['m', 'f', 'x'].indexOf(gender) === -1) {
  //     //     throw new Error('性别只能是 m、f 或 x');
  //     // }
  //     // if (!(bio.length >= 1 && bio.length <= 30)) {
  //     //     throw new Error('个人简介请限制在 1-30 个字符');
  //     // }
  //     // if (!req.files.avatar.name) {
  //     //     throw new Error('缺少头像');
  //     // }
  //     if (password.length < 6) {
  //         throw new Error('密码至少 6 个字符');
  //     }
  //     if (password !== repassword) {
  //         throw new Error('两次输入密码不一致');
  //     }
  // } catch (e) {
  //     // 注册失败，异步删除上传的头像
  //     res.render('signup',{errMsg:e.message});
  //     return res.redirect('/signup');
  // }
  if (!regExpname.test(username)) {
    req.flash('error', '用户名长度为6-12位，可以有字母，数字组成');
    return res.redirect('/signup');
  }
  if (!regExppwd.test(password)) {
    req.flash('error', '密码长度为6-12位，可以有字母，数字组成');
    return res.redirect('/signup');
  }
  if(repassword!=password){
    req.flash('error', '两次密码输入不一致');
    return res.redirect('/signup');
  }
  if(usernick.length>12||usernick.length<1){
      req.flash('error', '昵称长度为1-12位');
    return res.redirect('/signup');
  }
  if(checkbox=='undefined'){
    req.flash('error', '请同意加入FzRoom');
    return res.redirect('/signup');
  }
  if(useremail!=0&&!regExpemail.test(useremail)){
    req.flash('error', '邮箱格式不正确');
    return res.redirect('/signup');
  }
  else {
    var newUser = new User({
      username: username,
      userpwd: password,
      usernick: usernick,
      useremail: useremail,
      userphone: userphone,
      userhome: userhome,
      userclass: userclass,
      usersex: usersex,
      useravatar:useravatar
    });
    //检查用户名是否已经存在
    newUser.userNum(newUser.username, function (err, results) {

      if (results != null && results[0]['num'] > 0) {
        req.flash('error', '用户名已存在');
    return res.redirect('/signup');
      }

      if (err) {
         req.flash('error', '未知错误！');
    return res.redirect('/signup');
      }
      newUser.userSave(function (err, result) {
        if (err) {
           req.flash('error', '用户信息录入失败！');
    return res.redirect('/signup');
        }
        if (result.insertId > 0) {
          res.locals.status = "success";
          req.flash('success', '注册成功');
         return res.redirect('/signin');
          // res.render('signup', { errMsg: '' });
        }
        else {
          // res.render('signup', { errMsg: err });
          req.flash('error', '抱歉，注册未成功，请重新注册');
          return res.redirect('/signup');
        }
      });
    });
  }
});

module.exports = router;
