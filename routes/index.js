var express = require('express');
const appRoot = require('app-root-path');

const userRouter = require(appRoot + '/routes/users');
const adminRouter = require(appRoot + '/routes/admin');
var router = express.Router();

// /* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/user', userRouter);
router.use('/admin', adminRouter);

module.exports = router;
