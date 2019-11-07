var express = require('express');
var userRouter = express.Router();
const appRoot = require('app-root-path');

const UserController = require(appRoot + '/app/controllers/user_controller');
const userController = new UserController();

const ValidateRequestController = require(appRoot + "/app/helpers/validate_request");
const validateRequest = new ValidateRequestController();

userRouter.post('/login', userController.login)
userRouter.post('/register', validateRequest.validateRegistrationData, userController.registerUser)
userRouter.post('/logout', userController.logout)

module.exports = userRouter;
