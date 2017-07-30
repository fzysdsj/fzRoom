//路由模块 2017.7.26
const index = require('../controllers/index');
const users = require('../controllers/users');
const wuRoom = require('../controllers/wuRoom');
const wenRoom = require('../controllers/wenRoom');
const articles = require('../controllers/articles');
module.exports = function(app){
app.use('/', index);
app.use('/wenRoom', wenRoom);
app.use('/wuRoom', wuRoom);
app.use('/users', users);
app.use('/articles', articles);
}