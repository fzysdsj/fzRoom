//路由模块 2017.7.26
const index = require('../controllers/index');
const article = require('../controllers/article');
const forum = require('../controllers/forum');
const home = require('../controllers/home');
const search = require('../controllers/search');
const signup = require('../controllers/signup');
const signin = require('../controllers/signin');
const pvp = require('../controllers/pvp');
const pve = require('../controllers/pve');
const money = require('../controllers/money');
const author = require('../controllers/author');
const users = require('../controllers/users');
const userslist = require('../controllers/userslist');
const backend = require('../controllers/backend');

module.exports = function(app){
app.use('/', index);
app.use('/home', home);
app.use('/article', article);
app.use('/search', search);
app.use('/forum', forum);
app.use('/signin', signin);
app.use('/signup', signup);
app.use('/logout', users.logout);
app.use('/users', userslist);
app.use('/pve', pve);
app.use('/pvp', pvp);
app.use('/money', money);
app.use('/author', author);
app.use('/backend', backend);
app.use('/users/profile', users.profile);
}