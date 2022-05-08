const redis = require('redis');
const client = redis.createClient();

client.on('connect', () => {
    console.log('Redis client connected');
});
client.on("error", (err) => {
    console.log(err);
});

const storeToRedis = (request, response, dataObj) => {

    client.connect();
    client.select(1);
    client.exists(dataObj.id).then(
            (reply) => {
                if (reply === 1) {
                    console.log('data exists in redis');
                    console.log('id is duplicate')

                } else {
                    console.log('data not exists in redis!!!');
                    client.select(1);
                    client.set(dataObj.id, dataObj.data);
                    console.log("dataStorage update");
                    client.select(2);
                    client.set(dataObj.id, dataObj.parent);
                    console.log("dataMap update");
                    console.log("data are save")
                }
            })
        .catch(
            (err) => {
                console.log("error in connect to redis");

            })


}


module.exports = storeToRedis;