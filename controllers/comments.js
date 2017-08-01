
var express = require('express');
var db = require("../config/db");
var Article = require("../models/comments.js");
var fs = require('fs');
var path = require('path');
// var formidable = require('formidable');
var router = express.Router();
router.get("/",function(req,res,next){
        db.query("select * from comment", function (err, rows) {
        if (err) {
            res.render("commentList", { title: "评论列表", datas: [] });
        } else {
            res.render("commentList", { title: "评论列表", datas: rows});
        }
    });
})
router.get("/com/:id", function (req, res, next) {
    var id = req.params.id;
    var anthor = "";
    console.log(id);
    var sql = "select * from comment where comId = " + id;
    console.log(sql);
    db.query(sql, function (err, rows) {
        if (err) {
            res.send("查看页面跳转失败");
        } else {
            console.log(rows[0].artUid);
            var sqll = "select * from userinfo where userId = " + rows[0].artUid;
            db.query(sqll, function (err, row) {
                if(err){
                    console.log("ffffff");
                }
                else{
               
                console.log(row);
                }
            res.render("articlesId", { datas: rows ,anthors:row});
            })
        }
    });
});

//添加用户
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
    console.log("artcategory:"+artcategory);
    var artpic =path.basename(files.artpic.path)
    var date  = new Date();
    var y = date.getFullYear();
    var m =date.getMonth()+1;
    var d = date.getDate();
    console.log(date.getFullYear());
    console.log(date.getMonth()+1);
    console.log(date.getDate());
    var artstarttime =y+"-"+m+"-"+d;
    console.log("artstarttime:"+artstarttime);
    console.log("arttitle:"+arttitle);
    console.log("artcontent:"+artcontent);
    console.log("artuid:"+artuid);
    db.query("insert into article(artuid,arttitle,artcontent,artstarttime,artpic,artcategory) values('" + artuid + "','" + arttitle + "','" + artcontent + "','" + artstarttime + "','" + artpic + "','" + artcategory +  "')", function (err, rows) {
        if (err) {
            console.log("方丈失败!")
            res.send("新增失败" + err);
        } else {
            console.log("插入成功");
            res.redirect("/articles");
        }
    });
    });
    
});
module.exports = router;