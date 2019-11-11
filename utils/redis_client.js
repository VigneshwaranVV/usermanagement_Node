const appRoot = require('app-root-path');
const config_data = require(appRoot + '/config/config.js')();

const connEnv = process.env.CONN_ENV;

if (connEnv === null || connEnv === undefined) {
  const redis = require("redis");
  var redisClient = redis.createClient(Number(config_data.elasticache_redis_port), config_data.elasticache_redis_url);
} else {
  const RedisClustr = require("redis-clustr");
  var redisClient = new RedisClustr({
    servers: [
      {
        host: config_data.elasticache_redis_url,
        port: config_data.elasticache_redis_port
      }
    ]
  });
}

//This function initializes and returns a redis client instance
module.exports = function () {
  return redisClient;
}
