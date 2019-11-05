var express = require('express');
var userRouter = express.Router();
const appRoot = require('app-root-path');

const UserController = require(appRoot + '/app/controllers/user_controller');
const userController = new UserController();

userRouter.post('/login', userController.login)
userRouter.post('/logout', userController.logout)

module.exports = userRouter;
