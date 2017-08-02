
var express = require('express');
var db = require("../config/db");
var Article = require("../models/articles.js");
var fs = require('fs');
var path = require('path');
var formidable = require('formidable');
var router = express.Router();
router.get("/", function (req, res, next) {
    db.query("select * from article", function (err, rows) {
        if (err) {
            res.render("articleList", { title: "用户列表", datas: [] });
        } else {
            res.render("articleList", { title: "用户列表", datas: rows });
        }
    });
})
router.get("/art/:id", function (req, res, next) {
    var id = req.params.id;
    var anthor = "";
    var userArray = [];
    console.log(id);
    var sql = "select * from article where artId = " + id;
    console.log(sql);
    db.query(sql, function (err, rows) {
        if (err) {
            res.send("查看页面跳转失败");
        } else {
            console.log(rows[0].artUid);
            var sqll = "select * from userinfo where userId = " + rows[0].artUid;
            db.query(sqll, function (err, row) {
                if (err) {
                    console.log("ffffff");
                }
                else {
                    var sqlll = "select * from comment where comAid = " + id;
                    db.query(sqlll, function (err, comment) {
                        if (err) {
                            console.log("ssssssss");
                        }
                        else {
                            if(comment.length!=0){

                            for (var i = 0; i < comment.length; i++) {
                                var SELECT_USER = "select * from userinfo where userId = " + comment[i].comUid;
                                db.query(SELECT_USER, function (err, user) {
                                    if (err) {
                                        console.log("查询失败");
                                    } else {
                                        console.log("user:"+user[0].userAvatar);
                                        userArray.push(user[0]);
                                        console.log(userArray.length);
                                        console.log(row);
                                        if(userArray.length ==comment.length){
                                            console.log(userArray);
                                            console.log("用户名："+userArray[0].userAvatar);
            res.render("articlesId", { datas: rows, anthors: row, comment: comment,comer:userArray});
                                        }
                                    }
                                });
                            }
                            }else{
            res.render("articlesId", { datas: rows, anthors: row, comment: comment,comer:userArray});
                            }


                            // res.redirect("/articles/art/" + comaid);
                            // res.render("articlesId", {comments: row, sayer: user });
                            // console.log("渲染成功");

                        }

                    });
                }
            });
           
        }
    });
});

//添加文章
router.get("/create", function (req, res, next) {
    res.render("artAdd");
});
router.post("/create", function (req, res, next) {
    var form = new formidable.IncomingForm();
    //设置编辑
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = "./public/uploads/";
    //保留后缀
    form.keepExtensions = true;
    //设置单文件大小限制    
    form.maxFieldsSize = 2 * 1024 * 1024;
    form.parse(req, function (err, fields, files) {
        var arttitle = fields.arttitle;
        var artcontent = fields.artcontent;
        var artuid = fields.artuid;
        var artcategory = fields.artcategory;
        var time = Date.now;
        console.log("artcategory:" + artcategory);
        var artpic = path.basename(files.artpic.path)
        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var h = "";
        var mi = "";
        var s = "";
        m < 10 ? (m = "0" + m) : m;
        d < 10 ? (d = "0" + d) : d;
        date.getHours() < 10 ? (h = "0" + date.getHours()) : (h = date.getHours());
        date.getMinutes() < 10 ? (mi = "0" + date.getMinutes()) : (mi = date.getMinutes());
        date.getSeconds() < 10 ? (s = "0" + date.getSeconds()) : (s = date.getSeconds());
        var artstarttime = y + "-" + m + "-" + d + " " + h + ":" + mi + ":" + s;
        db.query("insert into article(artuid,arttitle,artcontent,artstarttime,artpic,artcategory) values('" + artuid + "','" + arttitle + "','" + artcontent + "','" + artstarttime + "','" + artpic + "','" + artcategory + "')", function (err, rows) {
            if (err) {
                console.log("方丈失败!")
                res.send("新增失败" + err);
            } else {
                console.log("插入成功");
                res.redirect("/articles/art"+artId);
            }
        });
    });

});
module.exports = router;