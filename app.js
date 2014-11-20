var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var multer = require('multer');

//Routes
var routes = require('./routes/index');
var users = require('./routes/users');
var homeroutes = require('./routes/home');
var insertroutes = require('./routes/insert_store');
var edit_store_routes = require('./routes/edit_store');
var edit_product_routes = require('./routes/edit_product');
var product_routes = require('./routes/product');
var search_routes = require('./routes/search');

var near = require('./routes/near');
//Connect database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/GanXa');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: '123456',resave: true, saveUninitialized: true}));
app.use(multer({dest: './public/images/'}));
//
app.use('/', routes);
app.use('/users', users);
app.use('/home', homeroutes);
app.use('/insert_store', insertroutes);
app.use('/edit_store', edit_store_routes);
app.use('/edit_product', edit_product_routes);
app.use('/product', product_routes);
app.use('/search', search_routes);
app.use('/near', near);
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