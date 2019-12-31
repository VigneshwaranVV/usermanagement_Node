const appRoot = require('app-root-path');
const userModel = require(appRoot + '/app/models/user_model');

class UserController {

  /**
   * @swagger
   * /api/v1/user/login:
   *   post:
   *     tags:
   *       - Auth
   *     description: login with username and password
   *
   *     parameters:
   *      - name: body
   *        in: body
   *        required: true
   *        schema:
   *           type: object
   *           properties:
   *             authRequest:
   *               type: object
   *               properties:
   *                 userName:
   *                   type: string
   *                   example: vv@vv.com
   *                 password:
   *                   type: string
   *                   example: Vicky100
   *             pinpointRequest:
   *               type: object
   *               properties:
   *                 customerSessionId:
   *                   type: string
   *                   example: 70e7e49f-8492-a3bb-51da-a294638232da
   *                 remoteAddr:
   *                   type: string
   *                   example: 10.5.89.178
   *                 userAgent:
   *                   type: string
   *                   example: ios
   *                 channel:
   *                   type: string
   *                   example: mobile
   *                 timestamp:
   *                   type: string
   *                   example: 2019-04-10 16:17:18
   *
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: returns session id
   */
  login(req, res, next) {
    try {
      userModel.login(req, res, next);
    } catch (e) {
      res.status(500).json({
        msg: 'Error - /user/login Failed!'
      });
    }
  }

  registerUser(req, res, next) {
    try {
      userModel.registerUser(req, res, next);
    } catch (e) {
      res.status(500).json({
        msg: 'Error - /user/registerUser Failed!'
      });
    }
  }

  logout(req, res, next) {
    try {
      userModel.logout(req, res, next);
    } catch (e) {
      res.status(500).json({
        msg: 'Error - /user/logout request Failed!'
      });
    }
  }
  deleteUser(req, res, next) {
    try {
      userModel.deleteUser(req, res, next);
    } catch (e) {
      res.status(500).json({
        msg: 'Error - /user/deleteUser request Failed!'
      });
    }
  }
  updateUser(req, res, next) {
    try {
      userModel.updateUser(req, res, next);
    } catch (e) {
      res.status(500).json({
        msg: 'Error - /user/updateUser request Failed!'
      });
    }
  }
}

module.exports = UserController;