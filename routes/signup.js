// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.render('signup');
// });

// module.exports = router;
var express = require('express');
var User = require("../models/users.js");
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup', {errMsg:""});
});
router.post('/',function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var newUser = new User({
      username : username,
      userpwd : password
    });
    //检查用户名是否已经存在
    newUser.userNum(newUser.username, function (err, results) {
      if (results != null && results[0]['num'] > 0) {
        err = '用户名已存在';
      }

      if (err) {
        res.render('signup', {errMsg: err });
        return;
      }
      newUser.userSave(function(err,result){
        if(err){
          res.render('signup', {errMsg: err });
          return;
        }
        if(result.insertId > 0){
          res.locals.status = "success";
          res.render('signup', {errMsg:'' });
        }
        else{
          res.render('signup', {errMsg: err });
        }
       });
    });
});

module.exports = router;
