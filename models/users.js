var mysql = require('mysql');
var DB_NAME= 'nodedb';
//创建连接池 createPool(Object)
// Object和createConnection参数相同。
var pool = mysql.createPool({
      host : '127.0.0.1',
      user : 'root',
      password :'root',
      database:'nodedb',
      port : 3306
  });
//可以监听connection事件，并设置session值
pool.on('connnection',function(connection){
  console.log("pool on");
  connection.query('SET SESSION auto_increment_increment=1')
});

function User(user){
  this.username = user.username;
  this.userpwd = user.userpwd;
  this.usernick =user.usernick;
  this.useremail = user.useremail;
  this.userphone = user.userphone;
  this.userhome = user.userhome;
  this.userclass = user.userclass;
  this.usersex = user.usersex;
}

User.prototype.userSave = function save(callback){
  console.log(this.username);
  console.log(this.userpwd);
  var user = {
    username : this.username,
    userpwd : this.userpwd,
    usernick:this.usernick,
    useremail:this.useremail,
    userphone:this.userphone,
    userhome:this.userhome,
    userclass:this.userclass,
    usersex:this.usersex
  };
  var INSERT_USER= "INSERT INTO USERINFO (USERID,USERNAME,USERPWD,USERNICK,USEREMAIL,USERPHONE,USERHOME,USERCLASS,USERSEX) VALUES (0,?,?,?,?,?,?,?,?)";
  pool.getConnection(function(err,connection){
    connection.query(INSERT_USER,[user.username,user.userpwd,user.usernick,user.useremail,user.userphone,user.userhome,user.userclass,user.usersex],function(err,result){
      if(err){
        console.log("INSERT_USER Error: " + err.message);
        return;
      }
      callback(err,result);
      connection.release();
    });
  });
};
//根据用户名得到用户数量
User.prototype.userNum = function(username, callback) {
  pool.getConnection(function(err,connection){
    console.log("getConnection");
    console.log("getUserNumByName");
    var SELECT_NUM = "SELECT COUNT(1) AS num FROM USERINFO WHERE USERNAME = ?";
    connection.query(SELECT_NUM, [username], function (err, result) {
      if (err) {
        console.log("SELECT_NUM Error: " + err.message);
        return;
      }
      connection.release();
      callback(err,result);
    });
  });
};
User.prototype.userInfo = function(callback){
  var user = {
    username : this.username,
    userpwd : this.userpwd,
    usernick:this.usernick,
    useremail:this.useremail,
    userphone:this.userphone,
    userhome:this.userhome,
    userclass:this.userclass,
    usersex:this.usersex
  };
  var SELECT_LOGIN ="SELECT * FROM USERINFO WHERE USERNAME = ?";
  pool.getConnection(function(err,connection){
    connection.query(SELECT_LOGIN,[user.username],function(err,result){
      if (err) {
        console.log("SELECT_LOGIN Error: " + err.message);
        return;
      }
      connection.release();
      callback(err,result);
    });
  });
}
module.exports = User;
