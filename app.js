const appRoot = require("app-root-path");
var createError = require('http-errors');
var express = require('express');
const cors = require("cors");
const session = require('express-session');
const configData = require(appRoot + '/config/config.js')();
const crypto = require('crypto');
const db= process.env.MONGO_URL || configData.mongoDB_elastic;

// const redis = require('redis');
// const redisClient = redis.createClient();
// const redisStore = require('connect-redis')(session);

const mongoose = require('mongoose');

mongoose
  .connect(db)
  .then(() => console.log("Database Connected"))
  .catch(err => console.log(err));

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
const routeUtil = require(appRoot + "/utils/route_util.js");

var app = express();
app.use(cors())

// app.use(session({secret: 'x1234'}));



app.use(
  session({
    genid: function (req) {
      // use UUIDs for session IDs
      return crypto
        .createHash("sha256")
        // .update(uuid.v1())
        .update(crypto.randomBytes(256))
        .digest("hex");
    },
    secret: "MySecretToken",
    //store: new redisStore({ host: process.env.ELASTICACHE_REDIS_DEV_URL, port: Number( process.env.ELASTICACHE_REDIS_DEV_PORT), client:rclient, ttl: 260 }),
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: true,
      maxAge: 3600
    }
  })
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});



// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const Whitelist = configData.whitelist_urls;
console.log("---whitelisted URL::::::", Whitelist)
const corsOptions = {
  origin: function (origin, callback) {
    if (Whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};
app.use(cors(corsOptions));
routeUtil.printRoutes(app);

module.exports = app;
