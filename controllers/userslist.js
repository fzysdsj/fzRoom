var express = require('express');
var db = require("../config/db");
var router = express.Router();
/**
 * 查询列表页
 */
router.get("/",function(req,res,next){
    db.query("select * from userinfo",function(err,rows){
        if(err){
            res.render("userList",{title:"用户列表",datas:[]});
        }else {
            res.render("userList",{title:"用户列表",datas:rows});
        }
    });
});

/**
 * 添加用户
 */
router.get("/add",function(req,res,next){
    res.render("add");
});
router.post("/add",function(req,res,next){
    var name = req.body.username;
    var pwd = req.body.userpwd;
    console.log(name);
    db.query("insert into userinfo(username,userpwd) values('"+name+"','"+ pwd +"')",function(err,rows){
        if(err){
            res.send("新增失败"+err);
        }else {
            res.redirect("/users");
        }
    });
});

/**
 * 删除用户
 */
router.get("/del/:id",function(req,res){
    var id = req.params.id;
    db.query("delete from userinfo where userid = " + id,function(err,rows){
        if(err){
            res.send("删除失败"+err);
        }else {
            res.redirect("/users");
        }
    });
});

/**
 * 修改
 */
router.get("/toUpdate/:id",function(req,res,next){
    var id = req.params.id;
    console.log(id);
    var sql = "select * from userinfo where userid = " + id;
    console.log(sql);
    db.query(sql,function(err,rows){
        if(err){
            res.send("修改页面跳转失败");
        }else {
            res.render("update",{datas:rows});
        }
    });
});
router.post("/update",function(req,res,next){
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
    var sql = "update userinfo set username = '"+ username +"',userpwd = '"+ userpwd +"',usernick = '"+ usernick +"',useremail = '"+ useremail +"',userphone = '"+ userphone +"',userhome = '"+ userhome +"',userclass = '"+ userclass +"',usersex = '"+ usersex +"' where userid = " + id;
    console.log(sql);
    db.query(sql,function(err,rows){
        if(err){
            res.send("修改失败 " + err);
        }else {
            res.redirect("/users");
        }
    });
});
router.get("/toSelect/:id",function(req,res,next){
    var id = req.params.id;
    console.log(id);
    var sql = "select * from userinfo where userid = " + id;
    console.log(sql);
    db.query(sql,function(err,rows){
        if(err){
            res.send("查看页面跳转失败");
        }else {
            res.render("select",{datas:rows});
        }
    });
});
/**
 * 查询
 */
router.post("/search",function(req,res,next){
    var name = req.body.s_name;
    var age = req.body.s_age;
    console.log("name:"+name);
    console.log("age:"+age);
    var sql = "select * from userinfo";
    if(name){
        sql += " where username = '"+ name +"'";
        console.log(sql);
    }
    //if(age){
    //    sql += " and age = '" + age + "'";
    //}

    sql.replace("and","where");
    console.log(sql);
    db.query(sql,function(err,rows){
        if(err){
            res.send("查询失败: "+err);
        }else{
            res.render("userList",{title:"用户列表",datas:rows,s_name:name,s_age:age});
        }
    });
})
module.exports = router;