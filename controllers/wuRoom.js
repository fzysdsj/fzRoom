//武阁模块
var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.render('wuRoom');
  return;
});
router.get('/pve', function(req, res, next) {
  res.render('pve');
});
router.get('/pvp', function(req, res, next) {
  res.render('pvp');
});
router.get('/collection',function(req,res,next){
  res.render('collection');
});
router.get('/collections',function(req,res,next){
  res.render('collectionNumber');
});
module.exports = router;
