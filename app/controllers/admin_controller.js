const appRoot = require('app-root-path');
const adminModel = require(appRoot + '/app/models/admin_model');

class UserController {

  listUser(req, res, next) {
    try {
      adminModel.listUser(req, res, next);
    } catch (e) {
      res.status(500).json({
        msg: 'Error - /admin/listUser Failed!'
      });
    }
  }
}

module.exports = UserController;