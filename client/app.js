var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true, parameterLimit: 50000 }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const NODE_ENV = process.env.NODE_ENV;
if(NODE_ENV === "development") {
  var webpack = require("webpack");
  var webpackConfig = require("./config/webpack.config.js")("development");

  var compiler = webpack(webpackConfig);

  // Show webpack build process
  new webpack.ProgressPlugin().apply(compiler);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.post("/getDataFromServer",function(req,res){
  res.send({
    content:"This is Response from Server:"+req.body.id
  })
})

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
