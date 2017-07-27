//文阁模块
var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
   res.render('home');
   return;
});
//文章模块
router.get('/article', function(req, res, next) {
  res.render('article');
});

/*加功能*/


//打赏模块
router.get('/money', function(req, res, next) {
  res.render('money');
});

/*加功能*/

//用户须知模块
router.get('/know', function(req, res, next) {
  res.render('author');
  return;
});

/*加功能*/


//全站搜索
router.get('/search', function(req, res, next) {
  res.render('search');
});

/*加功能*/

module.exports = router;