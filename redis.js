const redis = require('redis');

const RedisClient = (() => {
    return redis.createClient();

})();
// RedisClient.connect();

module.exports = RedisClient;