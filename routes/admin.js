var express = require('express');
var userRouter = express.Router();
const appRoot = require('app-root-path');

const AdminController = require(appRoot + '/app/controllers/admin_controller');
const adminController = new AdminController();

const ValidateRequestController = require(appRoot + "/app/helpers/validate_request");
const validateRequest = new ValidateRequestController();

userRouter.post('/listUser', adminController.listUser)

module.exports = userRouter;
