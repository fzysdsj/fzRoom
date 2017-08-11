
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
router.get("/article", function (req, res, next) {
    db.query("select * from article order by artid desc", function (err, rows) {
        if (err) {
            res.render("article", { title: "用户列表", datas: [] });
        } else {
            console.log(rows[0].artUid);
            console.log(rows.length);
            var userArray = [];
            var userArrayDemo = [];
            for (let i = 0; i < rows.length; i++) {
                var select_user = 'select * from userinfo where userid = ' + rows[i].artUid;
                console.log(select_user);
                db.query(select_user, function (err, row) {
                    if (err) {
                        console.log("读用户列表失败");
                    } else {
                        //将文章作者信息写进数组中，渲染给页面调用
                        console.log("row:");
                        console.log(rows[0]);
                        userArray.push(row[0]);
                        if (userArray.length == rows.length) {
                            for (let j = 0; j < rows.length; j++) {
                                var s = 0;
                                for (let k = 0; k < userArray.length; k++) {
                                    if (userArray[k].userId == rows[j].artUid && s == 0) {
                                        userArrayDemo.push(userArray[k]);
                                        s++;
                                        if (userArrayDemo.length == rows.length) {
                                            var count = 5;
                                            var currentPage = Math.ceil(rows.length/count);
                                            console.log("currentPage:"+currentPage);
                                            return res.render("article", { title: "用户列表", datas: rows, users: userArrayDemo,currentPage:currentPage,count:count });
                                        }
                                    }
                                }
                            }

                        }
                    }
                });
            }

        }
    });
});
router.get("/article/recommend", function (req, res, next) {
    db.query("select * from article where artpush>0 order by artid desc", function (err, rows) {
        if (err) {
            res.render("artRecommend", { title: "用户列表", datas: [] });
        } else {
            console.log(rows[0].artUid);
            console.log(rows.length);
            var userArray = [];
            var userArrayDemo = [];
            for (let i = 0; i < rows.length; i++) {
                var select_user = 'select * from userinfo where userid = ' + rows[i].artUid;
                console.log(select_user);
                db.query(select_user, function (err, row) {
                    if (err) {
                        console.log("读用户列表失败");
                    } else {
                        //将文章作者信息写进数组中，渲染给页面调用
                        console.log("row:");
                        console.log(rows[0]);
                        userArray.push(row[0]);
                        if (userArray.length == rows.length) {
                            for (let j = 0; j < rows.length; j++) {
                                var s = 0;
                                for (let k = 0; k < userArray.length; k++) {
                                    if (userArray[k].userId == rows[j].artUid && s == 0) {
                                        userArrayDemo.push(userArray[k]);
                                        s++;
                                        if (userArrayDemo.length == rows.length) {
                                             var count = 5;
                                            var currentPage = Math.ceil(rows.length/count);
                                            console.log("currentPage:"+currentPage);
                                            return res.render("artRecommend", { title: "用户列表", datas: rows, users: userArrayDemo,currentPage:currentPage,count:count });
                                        }
                                    }
                                }
                            }

                        }
                    }
                });
            }

        }
    });
});
router.get("/article/nice", function (req, res, next) {
    db.query("select * from article where artgood > 0 order by artid desc", function (err, rows) {
        if (err) {
            res.render("artNice", { title: "用户列表", datas: [] });
        } else {
            console.log(rows[0].artUid);
            console.log(rows.length);
            var userArray = [];
            var userArrayDemo = [];
            for (let i = 0; i < rows.length; i++) {
                var select_user = 'select * from userinfo where userid = ' + rows[i].artUid;
                console.log(select_user);
                db.query(select_user, function (err, row) {
                    if (err) {
                        console.log("读用户列表失败");
                    } else {
                        //将文章作者信息写进数组中，渲染给页面调用
                        console.log("row:");
                        console.log(rows[0]);
                        userArray.push(row[0]);
                        if (userArray.length == rows.length) {
                            for (let j = 0; j < rows.length; j++) {
                                var s = 0;
                                for (let k = 0; k < userArray.length; k++) {
                                    if (userArray[k].userId == rows[j].artUid && s == 0) {
                                        userArrayDemo.push(userArray[k]);
                                        s++;
                                        if (userArrayDemo.length == rows.length) {
                                               var count = 5;
                                            var currentPage = Math.ceil(rows.length/count);
                                            console.log("currentPage:"+currentPage);
                                            return res.render("artNice", { title: "用户列表", datas: rows, users: userArrayDemo,currentPage:currentPage,count:count });
                                        }
                                    }
                                }
                            }

                        }
                    }
                });
            }

        }
    });
});
router.get("/category/lishi", function (req, res, next) {
    db.query("select * from article where artcategory ='历史' order by artid desc", function (err, rows) {
        if (err) {
            res.render("artLishi", { title: "用户列表", datas: [] });
        } else {
            console.log(rows[0].artUid);
            console.log(rows.length);
            var userArray = [];
            var userArrayDemo = [];
            for (let i = 0; i < rows.length; i++) {
                var select_user = 'select * from userinfo where userid = ' + rows[i].artUid;
                console.log(select_user);
                db.query(select_user, function (err, row) {
                    if (err) {
                        console.log("读用户列表失败");
                    } else {
                        //将文章作者信息写进数组中，渲染给页面调用
                        console.log("row:");
                        console.log(rows[0]);
                        userArray.push(row[0]);
                        if (userArray.length == rows.length) {
                            for (let j = 0; j < rows.length; j++) {
                                var s = 0;
                                for (let k = 0; k < userArray.length; k++) {
                                    if (userArray[k].userId == rows[j].artUid && s == 0) {
                                        userArrayDemo.push(userArray[k]);
                                        s++;
                                        if (userArrayDemo.length == rows.length) {
                                           var count = 5;
                                            var currentPage = Math.ceil(rows.length/count);
                                            console.log("currentPage:"+currentPage);
                                            return res.render("artLishi", { title: "用户列表", datas: rows, users: userArrayDemo,currentPage:currentPage,count:count });
                                        }
                                    }
                                }
                            }

                        }
                    }
                });
            }

        }
    });
});
router.get("/category/meiwen", function (req, res, next) {
    db.query("select * from article where artcategory ='美文' order by artid desc", function (err, rows) {
        if (err) {
            res.render("artMeiwen", { title: "用户列表", datas: [] });
        } else {
            console.log(rows[0].artUid);
            console.log(rows.length);
            var userArray = [];
            var userArrayDemo = [];
            for (let i = 0; i < rows.length; i++) {
                var select_user = 'select * from userinfo where userid = ' + rows[i].artUid;
                console.log(select_user);
                db.query(select_user, function (err, row) {
                    if (err) {
                        console.log("读用户列表失败");
                    } else {
                        //将文章作者信息写进数组中，渲染给页面调用
                        console.log("row:");
                        console.log(rows[0]);
                        userArray.push(row[0]);
                        if (userArray.length == rows.length) {
                            for (let j = 0; j < rows.length; j++) {
                                var s = 0;
                                for (let k = 0; k < userArray.length; k++) {
                                    if (userArray[k].userId == rows[j].artUid && s == 0) {
                                        userArrayDemo.push(userArray[k]);
                                        s++;
                                        if (userArrayDemo.length == rows.length) {
                                            var count = 5;
                                            var currentPage = Math.ceil(rows.length/count);
                                            console.log("currentPage:"+currentPage);
                                            return res.render("artMeiwen", { title: "用户列表", datas: rows, users: userArrayDemo,currentPage:currentPage,count:count });
                                        }
                                    }
                                }
                            }

                        }
                    }
                });
            }

        }
    });
});
router.get("/category/jishu", function (req, res, next) {
    db.query("select * from article where artcategory ='技术' order by artid desc", function (err, rows) {
        if (err) {
            res.render("artJishu", { title: "用户列表", datas: [] });
        } else {
            console.log(rows[0].artUid);
            console.log(rows.length);
            var userArray = [];
            var userArrayDemo = [];
            for (let i = 0; i < rows.length; i++) {
                var select_user = 'select * from userinfo where userid = ' + rows[i].artUid;
                console.log(select_user);
                db.query(select_user, function (err, row) {
                    if (err) {
                        console.log("读用户列表失败");
                    } else {
                        //将文章作者信息写进数组中，渲染给页面调用
                        console.log("row:");
                        console.log(rows[0]);
                        userArray.push(row[0]);
                        if (userArray.length == rows.length) {
                            for (let j = 0; j < rows.length; j++) {
                                var s = 0;
                                for (let k = 0; k < userArray.length; k++) {
                                    if (userArray[k].userId == rows[j].artUid && s == 0) {
                                        userArrayDemo.push(userArray[k]);
                                        s++;
                                        if (userArrayDemo.length == rows.length) {
                                              var count = 5;
                                            var currentPage = Math.ceil(rows.length/count);
                                            console.log("currentPage:"+currentPage);
                                            return res.render("artJishu", { title: "用户列表", datas: rows, users: userArrayDemo,currentPage:currentPage,count:count });
                                        }
                                    }
                                }
                            }

                        }
                    }
                });
            }

        }
    });
});
router.get("/category/yishi", function (req, res, next) {
    db.query("select * from article where artcategory ='轶事' order by artid desc", function (err, rows) {
        if (err) {
            res.render("artYishi", { title: "用户列表", datas: [] });
        } else {
            console.log(rows[0].artUid);
            console.log(rows.length);
            var userArray = [];
            var userArrayDemo = [];
            for (let i = 0; i < rows.length; i++) {
                var select_user = 'select * from userinfo where userid = ' + rows[i].artUid;
                console.log(select_user);
                db.query(select_user, function (err, row) {
                    if (err) {
                        console.log("读用户列表失败");
                    } else {
                        //将文章作者信息写进数组中，渲染给页面调用
                        console.log("row:");
                        console.log(rows[0]);
                        userArray.push(row[0]);
                        if (userArray.length == rows.length) {
                            for (let j = 0; j < rows.length; j++) {
                                var s = 0;
                                for (let k = 0; k < userArray.length; k++) {
                                    if (userArray[k].userId == rows[j].artUid && s == 0) {
                                        userArrayDemo.push(userArray[k]);
                                        s++;
                                        if (userArrayDemo.length == rows.length) {
                                           var count = 5;
                                            var currentPage = Math.ceil(rows.length/count);
                                            console.log("currentPage:"+currentPage);
                                            return res.render("artYishi", { title: "用户列表", datas: rows, users: userArrayDemo,currentPage:currentPage,count:count });
                                        }
                                    }
                                }
                            }

                        }
                    }
                });
            }

        }
    });
});
router.get("/category/tiyu", function (req, res, next) {
    db.query("select * from article where artcategory ='体育' order by artid desc", function (err, rows) {
        if (err) {
            res.render("artTiyu", { title: "用户列表", datas: [] });
        } else {
            console.log(rows[0].artUid);
            console.log(rows.length);
            var userArray = [];
            var userArrayDemo = [];
            for (let i = 0; i < rows.length; i++) {
                var select_user = 'select * from userinfo where userid = ' + rows[i].artUid;
                console.log(select_user);
                db.query(select_user, function (err, row) {
                    if (err) {
                        console.log("读用户列表失败");
                    } else {
                        //将文章作者信息写进数组中，渲染给页面调用
                        console.log("row:");
                        console.log(rows[0]);
                        userArray.push(row[0]);
                        if (userArray.length == rows.length) {
                            for (let j = 0; j < rows.length; j++) {
                                var s = 0;
                                for (let k = 0; k < userArray.length; k++) {
                                    if (userArray[k].userId == rows[j].artUid && s == 0) {
                                        userArrayDemo.push(userArray[k]);
                                        s++;
                                        if (userArrayDemo.length == rows.length) {
                                               var count = 5;
                                            var currentPage = Math.ceil(rows.length/count);
                                            console.log("currentPage:"+currentPage);
                                            return res.render("artTiyu", { title: "用户列表", datas: rows, users: userArrayDemo,currentPage:currentPage,count:count });
                                        }
                                    }
                                }
                            }

                        }
                    }
                });
            }

        }
    });
});
router.get("/category/liangxing", function (req, res, next) {
    db.query("select * from article where artcategory ='两性' order by artid desc", function (err, rows) {
        if (err) {
            res.render("artLiangxing", { title: "用户列表", datas: [] });
        } else {
            console.log(rows[0].artUid);
            console.log(rows.length);
            var userArray = [];
            var userArrayDemo = [];
            for (let i = 0; i < rows.length; i++) {
                var select_user = 'select * from userinfo where userid = ' + rows[i].artUid;
                console.log(select_user);
                db.query(select_user, function (err, row) {
                    if (err) {
                        console.log("读用户列表失败");
                    } else {
                        //将文章作者信息写进数组中，渲染给页面调用
                        console.log("row:");
                        console.log(rows[0]);
                        userArray.push(row[0]);
                        if (userArray.length == rows.length) {
                            for (let j = 0; j < rows.length; j++) {
                                var s = 0;
                                for (let k = 0; k < userArray.length; k++) {
                                    if (userArray[k].userId == rows[j].artUid && s == 0) {
                                        userArrayDemo.push(userArray[k]);
                                        s++;
                                        if (userArrayDemo.length == rows.length) {
                                             var count = 5;
                                            var currentPage = Math.ceil(rows.length/count);
                                            console.log("currentPage:"+currentPage);
                                            return res.render("artLiangxing", { title: "用户列表", datas: rows, users: userArrayDemo,currentPage:currentPage,count:count });
                                        }
                                    }
                                }
                            }

                        }
                    }
                });
            }

        }
    });
});
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
                            var UPDATE_PV = "update article set artsaw = artsaw+1 where artid = " + id;
                            console.log("UPDATE_PV:" + UPDATE_PV);
                            db.query(UPDATE_PV, function (err, user) {
                                if (err) {
                                    console.log("更新失败");
                                } else {

                                    if (comment.length != 0) {

                                        for (var i = 0; i < comment.length; i++) {
                                            var SELECT_USER = "select * from userinfo where userId = " + comment[i].comUid;
                                            db.query(SELECT_USER, function (err, user) {
                                                if (err) {
                                                    console.log("查询失败");
                                                } else {
                                                    userArray.push(user[0]);
                                                    if (userArray.length == comment.length) {
                                                        res.render("articlesId", { datas: rows, anthors: row, comment: comment, comer: userArray });
                                                    }
                                                }
                                            });
                                        }
                                    }
                                    else {
                                        res.render("articlesId", { datas: rows, anthors: row, comment: comment, comer: userArray });
                                    }
                                }
                            });
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
        var artsaw = 0;
        var artup = 0;
        var artsaynumber = 0;
        var artgood = 0;
        var artpush = 0;
        db.query("insert into article(artuid,arttitle,artcontent,artstarttime,artpic,artcategory,artsaw,artup,artsaynumber,artgood,artpush) values('" + artuid + "','" + arttitle + "','" + artcontent + "','" + artstarttime + "','" + artpic + "','" + artcategory + "','" + artsaw + "','" + artup + "','" + artsaynumber + "','" + artgood + "','" + artpush + "')", function (err, rows) {
            if (err) {
                console.log("方丈失败!")
                res.send("新增失败" + err);
            } else {
                console.log("插入成功");
                res.redirect("/");
            }
        });
    });

});
router.get("/del/:id", function (req, res) {
    var id = req.params.id;
    db.query("delete from article where artid = " + id, function (err, rows) {
        if (err) {
            res.send("删除失败" + err);
        } else {
            res.redirect("/articles");
        }
    });
});

module.exports = router;