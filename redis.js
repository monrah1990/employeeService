// const asyncRedis = require("async-redis");
// const client = asyncRedis.createClient();
const redis = require('redis');

const client = redis.createClient();

client.on('error', (err) => console.log('Redis Client Error', err));
client.connect();

module.exports = client;


/* const client = (() => {

    return redis.createClient();

})(); */
