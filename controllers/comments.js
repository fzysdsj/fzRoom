
var express = require('express');
var db = require("../config/db");
var Article = require("../models/comments.js");
var fs = require('fs');
var path = require('path');
// var formidable = require('formidable');
var router = express.Router();
router.get("/", function (req, res, next) {
    db.query("select * from comment", function (err, rows) {
        if (err) {
            res.render("commentList", { title: "评论列表", datas: [] });
        } else {
            res.render("commentList", { title: "评论列表", datas: rows });
        }
    });
})
// router.get("/com/:id", function (req, res, next) {
//     var id = req.params.id;
//     console.log(id);
//     var sql = "select * from comment where comId = " + id;
//     console.log(sql);
//     db.query(sql, function (err, rows) {
//         if (err) {
//             res.send("查看页面跳转失败");
//         } else {
//             console.log(rows[0].comUid);
//             console.log(rows[0].comAid);
//             var sqll = "select * from userinfo where userId = " + rows[0].comUid;
//             db.query(sqll, function (err, row) {
//                 if (err) {
//                     console.log("ffffff");
//                 }
//                 else {
//                     console.log(row);
//                     res.render("articlesId", { comments: rows, sayer: row });
//                 }
//             })
//         }
//     });
// });

//添加用户
router.get("/create", function (req, res, next) {
    res.render("articlesId");
});
router.post("/create", function (req, res, next) {
    var comcontent = req.body.comcontent;
    user = req.session.user;
    var comaid = req.body.comaid;
    var comuid = user.userId;
    console.log("comcontent:" + comcontent);
    console.log("comaid:" + comaid);
    console.log("comuid:" + comuid);
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
    var comstarttime = y + "-" + m + "-" + d + " " + h + ":" + mi + ":" + s;
    var comup = 0;
    var comdown = 0;

    var INSERT_COMMENT = "insert into comment(comaid,comuid,comcontent,comstarttime,comup,comdown) values('" + comaid + "','" + comuid + "','" + comcontent + "','" + comstarttime + "','" + comup + "','" + comdown + "')";
    db.query(INSERT_COMMENT, function (err, rows) {
        if (err) {
            console.log("方丈失败!")
            res.send("新增失败" + err);
        } else {
            console.log(rows);
            console.log("插入成功");
            res.redirect("/articles/art/" + comaid);

        }
    });
});
router.get("/del/:id", function (req, res) {
    var id = req.params.id;
    db.query("delete from comment where comid = " + id, function (err, rows) {
        if (err) {
            res.send("删除失败" + err);
        } else {
            return res.redirect("comments");
        }
    });
});
module.exports = router;