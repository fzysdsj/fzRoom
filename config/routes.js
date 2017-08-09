//路由模块 2017.7.26
const index = require('../controllers/index');
const users = require('../controllers/users');
const wuRoom = require('../controllers/wuRoom');
const wenRoom = require('../controllers/wenRoom');
const articles = require('../controllers/articles');
const comments = require('../controllers/comments');
const followedAndFans = require('../controllers/followedAndFans');
module.exports = function(app){
app.use('/', index);
app.use('/wenRoom', wenRoom);
app.use('/wuRoom', wuRoom);
app.use('/users', users);
app.use('/articles', articles);
app.use('/comments', comments);
app.use('/follow', followedAndFans);
}