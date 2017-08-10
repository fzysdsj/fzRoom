//索阁模块
var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.render('search');
  return;
});
module.exports = router;