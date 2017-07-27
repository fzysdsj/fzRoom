//用户相关
var express = require('express');
var db = require("../config/db");
var User = require("../models/users.js");
var fs = require('fs');
var path = require('path');
var formidable = require('formidable');
var router = express.Router();
//用户列表页
router.get("/", function (req, res, next) {
    db.query("select * from userinfo", function (err, rows) {
        if (err) {
            res.render("userList", { title: "用户列表", datas: [] });
        } else {
            res.render("userList", { title: "用户列表", datas: rows });
        }
    });
});

//添加用户
router.get("/add", function (req, res, next) {
    res.render("add");
});
router.post("/add", function (req, res, next) {
    var name = req.body.username;
    var pwd = req.body.userpwd;
    console.log(name);
    db.query("insert into userinfo(username,userpwd) values('" + name + "','" + pwd + "')", function (err, rows) {
        if (err) {
            res.send("新增失败" + err);
        } else {
            res.redirect("/users");
        }
    });
});

//删除用户
router.get("/del/:id", function (req, res) {
    var id = req.params.id;
    db.query("delete from userinfo where userid = " + id, function (err, rows) {
        if (err) {
            res.send("删除失败" + err);
        } else {
            res.redirect("/users");
        }
    });
});

//修改用户信息
router.get("/toUpdate/:id", function (req, res, next) {
    var id = req.params.id;
    console.log(id);
    var sql = "select * from userinfo where userid = " + id;
    console.log(sql);
    db.query(sql, function (err, rows) {
        if (err) {
            res.send("修改页面跳转失败");
        } else {
            res.render("update", { datas: rows });
        }
    });
});
router.post("/update", function (req, res, next) {
    var id = req.body.id;
    var username = req.body.username;
    var userpwd = req.body.userpwd;
    var usernick = req.body.usernick;
    var useremail = req.body.useremail;
    var userphone = req.body.userphone;
    var userhome = req.body.userhome;
    var userclass = req.body.userclass;
    var usersex = req.body.usersex;
    console.log(id);
    var sql = "update userinfo set username = '" + username + "',userpwd = '" + userpwd + "',usernick = '" + usernick + "',useremail = '" + useremail + "',userphone = '" + userphone + "',userhome = '" + userhome + "',userclass = '" + userclass + "',usersex = '" + usersex + "' where userid = " + id;
    console.log(sql);
    db.query(sql, function (err, rows) {
        if (err) {
            res.send("修改失败 " + err);
        } else {
            res.redirect("/users");
        }
    });
});
//查看用户信息(用户信息页)
router.get("/toSelect/:id", function (req, res, next) {
    var id = req.params.id;
    console.log(id);
    var sql = "select * from userinfo where userid = " + id;
    console.log(sql);
    db.query(sql, function (err, rows) {
        if (err) {
            res.send("查看页面跳转失败");
        } else {
            res.render("select", { datas: rows });
        }
    });
});
//查询用户信息
router.post("/search", function (req, res, next) {
    var name = req.body.s_name;
    var age = req.body.s_age;
    console.log("name:" + name);
    console.log("age:" + age);
    var sql = "select * from userinfo";
    if (name) {
        sql += " where username = '" + name + "'";
        console.log(sql);
    }
    sql.replace("and", "where");
    console.log(sql);
    db.query(sql, function (err, rows) {
        if (err) {
            res.send("查询失败: " + err);
        } else {
            res.render("userList", { title: "用户列表", datas: rows, s_name: name, s_age: age });
        }
    });
})
//用户注册
router.get('/signup', function (req, res, next) {
    res.render('signup', {
        errMsg: ""
    });
});
router.post('/signup', function (req, res) {
    // var userId = Math.ceil(Math.random(0, 1) * 1000000);
    // var userid = userId;
    console.log('开始文件上传....');
    var regExpname = /[A-Za-z0-9_\-\u4e00-\u9fa5]{6,12}/;
    var regExppwd = /[A-Za-z0-9_\-\u4e00-\u9fa5]{6,12}/;
    var regExpemail = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
    //手机
    var regExpPhone = /0?(13|14|15|18)[0-9]{9}/;
    var form = new formidable.IncomingForm();
    //设置编辑
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = "./public/images/";
    //保留后缀
    form.keepExtensions = true;
    //设置单文件大小限制    
    form.maxFieldsSize = 2 * 1024 * 1024;
    form.parse(req, function (err, fields, files) {
        var username = fields.username;
        var password = fields.password;
        var repassword = fields.repassword;
        var usernick = fields.usernick;
        var userphone = fields.userphone;
        var useremail = fields.useremail;
        var userhome = fields.userhome;
        var usersex = fields.usersex;
        var checkbox = fields.checkbox;
        var useravatar = path.basename(files.useravatar.path);
        console.log('checkbox:' + checkbox);
        console.log('useravatar:' + useravatar);
        console.log('usersex:' + usersex);
        var userclass = 0;
        if (!regExpname.test(username)) {
            req.flash('error', '用户名长度为6-12位，可以有字母，数字组成');
            return res.redirect('/users/signup');
        }
        if (!regExppwd.test(password)) {
            req.flash('error', '密码长度为6-12位，可以有字母，数字组成');
            return res.redirect('/users/signup');
        }
        if (repassword != password) {
            req.flash('error', '两次密码输入不一致');
            return res.redirect('/users/signup');
        }
        if (usernick.length > 12 || usernick.length < 1) {
            req.flash('error', '昵称长度为1-12位');
            return res.redirect('/users/signup');
        }
        if (checkbox == 'undefined') {
            req.flash('error', '请同意加入FzRoom');
            return res.redirect('/users/signup');
        }
        if (useremail != 0 && !regExpemail.test(useremail)) {
            req.flash('error', '邮箱格式不正确');
            return res.redirect('/users/signup');
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
                useravatar: useravatar
            });
            //检查用户名是否已经存在
            newUser.userNum(newUser.username, function (err, results) {

                if (results != null && results[0]['num'] > 0) {
                    req.flash('error', '用户名已存在');
                    return res.redirect('/users/signup');
                }

                if (err) {
                    req.flash('error', '未知错误！');
                    return res.redirect('/users/signup');
                }
                newUser.userSave(function (err, result) {
                    if (err) {
                        req.flash('error', '用户信息录入失败！');
                        return res.redirect('/users/signup');
                    }
                    if (result.insertId > 0) {
                        res.locals.status = "success";
                        req.flash('success', '注册成功');
                        return res.redirect('/users/signin');
                        // res.render('signup', { errMsg: '' });
                    }
                    else {
                        // res.render('signup', { errMsg: err });
                        req.flash('error', '抱歉，注册未成功，请重新注册');
                        return res.redirect('/users/signup');
                    }
                });
            });
        }
    });
});
//用户登录
router.get('/signin', function (req, res, next) {
    res.render('signin', { errMsg: '' });
});
router.post("/signin", function (req, res) {
    
    //获取form表单提交的登录数据
    var username = req.body.username;
    var password = req.body.password;
    console.log(req.session.username);
    var loginUser = new User({
        username: username,
        userpwd: password
    });
    //通过用户名取到用户信息
    loginUser.userInfo(function (err, result) {
        if (err) {
            req.flash('error', '未知错误');
            return res.redirect('/users/signin');
        }
        if (result == '') {
            req.flash('error', '用户不存在');
            return res.redirect('/users/signin');
        }
        if (req.session.user) {
            if (req.session.user.username == username) {
                req.flash('error', '用户已登录');
                return res.redirect('/users/signin');
            }
            else {
                req.flash('error', '已有用户登录，请先退出当前用户');
                return res.redirect('/users/signin');
            }
        }
        else {
            //判断用户密码是否填写正确  演示没做加密，等有时间再加
            if (result[0]['userpwd'] == password) {
                var user = {
                    'username': username,
                    'userpwd': password,
                    'usernick': result[0]['usernick'],
                    'useravatar': result[0]['useravatar'],
                    'userid':result[0]['userid']
                };
                console.log("userid:"+user.userid);
                req.session.user = user;//保存用户session信息
                //等级大于1000的，为管理员，直接进入后台页面
                if (result[0]['userclass'] > 1000) {
                    res.redirect('/users/backend');
                } else {
                    res.redirect('/wenRoom/know');
                }
            }
            else {
                req.flash('error', '密码错误');
                return res.redirect('/users/signin');
            }
        }
    });
});
//用户登出
router.get("/logout", function (req, res, next) {
    if (!req.session.user) {
        console.log("未登录");
        return res.redirect('/users/signin');
    }
    else {
        // 清空 session 中用户信息
        req.session.user = null;
        // 登出成功后跳转到主页
        console.log("删除用户信息成功");
        console.log(req.session.user);
        res.redirect('/users/signin');
    }
});
router.get('/backend', function(req, res, next) {
  res.render('backend');
  return;
});
module.exports = router;