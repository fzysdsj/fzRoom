
var express = require('express');
var db = require("../config/db");
var Article = require("../models/articles.js");
var fs = require('fs');
var path = require('path');
// var formidable = require('formidable');
var router = express.Router();
router.get("/", function (req, res, next) {
    // db.query("select * from article", function (err, rows) {
    //     if (err) {
    //         res.render("userList", { title: "用户列表", datas: [] });
    //     } else {
    //         res.render("userList", { title: "用户列表", datas: rows });
    //     }
    // });
    res.render('article',{title:'文章页'});
});

//添加用户
router.get("/add", function (req, res, next) {
    res.render("artAdd");
});
router.post("/add", function (req, res, next) {
    var arttitle = req.body.arttitle;
    var artcontent = req.body.artcontent;
    var artuid = req.body.artuid;
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