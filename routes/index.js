var express = require('express');
const appRoot = require('app-root-path');

const userRouter = require(appRoot + '/routes/users');
var router = express.Router();

// /* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/user', userRouter);

module.exports = router;
