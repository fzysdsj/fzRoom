var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var user = req.session.user;
  console.log("pvp:");
  console.log(user);
  res.render('pvp');
});

module.exports = router;
