var appRoot = require('app-root-path');
let config_data = null;
module.exports = function () {
    config_data = {}
    var connEnv = process.env.CONN_ENV
    //Default config file
    if (connEnv == "dev") {
        config_data = require(appRoot + '/config/config.dev.json');
    }
    else {
        config_data = require(appRoot + '/config/config.local.json');
    }
    return config_data;
}