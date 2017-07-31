
var express = require('express');
var db = require("../config/db");
var Article = require("../models/articles.js");
var fs = require('fs');
var path = require('path');
// var formidable = require('formidable');
var router = express.Router();
router.get("/",function(req,res,next){
        db.query("select * from article", function (err, rows) {
        if (err) {
            res.render("articleList", { title: "用户列表", datas: [] });
        } else {
            res.render("articleList", { title: "用户列表", datas: rows });
        }
    });
})
router.get("/:id", function (req, res, next) {
   var id = req.params.id;
    console.log("文章ID："+id);
    var sql = "select * from article where artId = " + id;
    console.log(sql);
    db.query(sql, function (err, rows) {
        if (err) {
            res.send("修改页面跳转失败");
        } else {
            console.log("文章发表成功");
            res.render("articleId", { datas: rows });
            res.redirect("/articles/"+id);
        }
    });
});

//添加用户
router.get("/add", function (req, res, next) {
    res.render("artAdd");
});
router.post("/add", function (req, res, next) {
    var id = req.params.id;
    console.log("文章ID："+id);
    var arttitle = req.body.arttitle;
    var artcontent = req.body.artcontent;
    var artuid = req.body.artuid;
    console.log("arttitle:"+arttitle);
    console.log("artcontent:"+artcontent);
    console.log("artuid:"+artuid);
    db.query("insert into article(artuid,arttitle,artcontent) values('" + artuid + "','" + arttitle + "','" + artcontent + "')", function (err, rows) {
        if (err) {
            console.log("方丈失败!")
            res.send("新增失败" + err);
        } else {
            console.log("插入成功");
            res.redirect("/articles");
        }
    });
});
module.exports = router;