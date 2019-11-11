var createError = require('http-errors');
var express = require('express');
const cors = require("cors");
const session = require('express-session');
const crypto = require('crypto');

// const redis = require('redis');
// const redisClient = redis.createClient();
// const redisStore = require('connect-redis')(session);

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const appRoot = require("app-root-path");
var indexRouter = require('./routes/index');
const routeUtil = require(appRoot + "/utils/route_util.js");
const configData = require(appRoot + '/config/config.js')();

var app = express();

// app.use(session({secret: 'x1234'}));



app.use(session({
  secret: 'x1234',
  genid: function (req) {
    // use UUIDs for session IDs
    // return crypto.createHash('sha256').update(uuidv1()).update(crypto.randomBytes(256)).digest("hex");
  },
  name: '_redisPractice',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Note that the cookie-parser module is no longer needed
  // store: new redisStore({ host: 'localhost', port: 6379, client: redisClient, ttl: 86400 }),
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
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
app.use(cors())
// app.use(cors(corsOptions));
routeUtil.printRoutes(app);

module.exports = app;
