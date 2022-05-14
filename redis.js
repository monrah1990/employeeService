const redis = require('redis');

const client = redis.createClient();

client.on('error', (err) => console.log('Redis Client Error', err));
client.connect();

module.exports = client;


// const redis = require('redis');
// const { promisifyAll } = require('bluebird');

// promisifyAll(redis);

// const runApplication = async () => {
//     // Connect to redis at 127.0.0.1 port 6379 no password.
//     const client = redis.createClient();

//     await client.setAsync('foo', 'bar');
//     const fooValue = await client.getAsync('foo');
//     console.log(fooValue);
// };

// runApplication();

// client.set('foo', 'bar', (err, reply) => {
//     if (err) throw err;
//     console.log(reply);

//     client.get('foo', (err, reply) => {
//         if (err) throw err;
//         console.log(reply);
//     });
// });