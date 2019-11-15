var appRoot = require('app-root-path');
let config_data = null;
module.exports = function () {

    config_data = {}
    //Default config file
    config_data = require(appRoot + '/config/config.local.json');


    return config_data;
}