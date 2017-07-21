var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
// var ejs = require('ejs');
var MySQLStore = require('express-mysql-session')(session);
const index = require('./routes/index');
const signup = require('./routes/signup');
const signin = require('./routes/signin');
const article = require('./routes/article');
const forum = require('./routes/forum');
const home = require('./routes/home');
const search = require('./routes/search');
const pvp = require('./routes/pvp');
const pve = require('./routes/pve');
const money = require('./routes/money');
const author = require('./routes/author');
const users = require('./routes/users');
var app = express();
var options = {  
    host: 'localhost',  
    port: 3306,  
    user: 'session_test',  
    password: 'password',  
    database: 'session_test'  
} 
// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
// app.engine('.html',ejs.__express);
// app.set('view engine', 'html');
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 设置 Session
app.use(session({
     secret: '12345',
     name: 'demo',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
     cookie: {maxAge: 80000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
     resave: false,
     saveUninitialized: true,
 }));

app.use('/', index);
app.use('/home', home);
app.use('/article', article);
app.use('/search', search);
app.use('/forum', forum);
app.use('/signin', signin);
app.use('/signup', signup);
app.use('/pve', pve);
app.use('/pvp', pvp);
app.use('/money', money);
app.use('/author', author);
app.use('/users', users)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
