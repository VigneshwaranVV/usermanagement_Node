const appRoot = require('app-root-path');
const rclient = require(appRoot + "/utils/redis_client")();
const users_schema = require(appRoot + "/app/models/db_model/users")
const constants = require(appRoot + "/common/constants")
var async = require('async');
//This method process the login API request from client using the response from Mulesoft.
function listUser(req, res, next) {
    res.json({
        "status": "Failed",
        "responseCode": constants.STATUS_CODE.INTERNAL_SERVER_ERROR,
        "message": "Internal server error",
    });
    
    try {

    }
    catch (err) {
        res.json({
            "status": "Failed",
            "responseCode": constants.STATUS_CODE.INTERNAL_SERVER_ERROR,
            "message": "Internal server error",
        });
    }

}

module.exports = {
    listUser
}