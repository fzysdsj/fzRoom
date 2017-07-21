var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var user = req.session.user;
   res.render('home', { username:user.username});
});

module.exports = router;