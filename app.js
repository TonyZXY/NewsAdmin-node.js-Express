var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');


var indexRouter = require('./routes/index');
var newsRouter = require('./routes/news-router');


var app = express();

var options = {
    user: 'bglappdev100',
    pass: "appdevgkV6="
};

mongoose.connect('mongodb://10.10.6.111:27017/BGLNewsAppbkend', options);
// mongoose.connect('mongodb://localhost/news');
var db = mongoose.connection;



// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout',extname: '.hbs'}));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/news',newsRouter);
app.use('/', indexRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
