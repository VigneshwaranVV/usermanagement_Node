const appRoot = require('app-root-path');
const rclient = require(appRoot + "/utils/redis_client")();
const constants = require(appRoot + "/common/constants")
var async = require('async');
//This method process the login API request from client using the response from Mulesoft.
function listUser(req, res, next) {
    try {

        // var jobs = [];
        // rclient.keys('*', function (err, keys) {
        //     if (err) return console.log(err);
        //     if (keys) {
        //         async.map(keys, function (key, cb) {
        //             rclient.get(key, function (error, value) {
        //                 if (error) return cb(error);
        //                 var job = {};
        //                 job['email'] = key;
        //                 job['userData'] = JSON.parse(value);
        //                 cb(null, job);
        //             });
        //         }, function (error, results) {
        //             if (error) return console.log(error);
        //             // console.log(results);
        //             res.json({ 
        //                 data: results,
        //                 "status": "success",
        //                 "responseCode": constants.STATUS_CODE.SUCCESS,
                    
        //             });
        //         });
        //     }
        // });







        // rclient.get(req.body.email, function (err, reply) {
        //     if (reply) {
        //         res.json({
        //             "status": "success",
        //             "responseCode": constants.STATUS_CODE.SUCCESS,
        //             "message": "Login succeeded",
        //             "userData": JSON.parse(reply)
        //         });
        //     }
        //     else {
        //         res.json({
        //             "status": "Failed",
        //             "responseCode": 422,
        //             "message": "User Not found",
        //         });
        //     }
        // })
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