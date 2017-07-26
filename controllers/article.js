var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('article');
});
router.get('/',function(req,res){
  var user = req.session.user;
  User.fetch(function(err,users) {
    if(err){
      console.log(err);
    }
    res.render('userList',{
      title:'方丈阁 用户列表页',
      users: users
    })
  })
})
module.exports = router;
