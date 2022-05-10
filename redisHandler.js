const client = require('./redis');


/// set redis
const setRedis = (request, response) => {

    client.select(1);
    client.exists(dataObj.id)
        .then(
            (reply) => {
                if (reply === 1) {
                    console.log('data exists in redis');
                    console.log('id is duplicate');

                } else {
                    console.log('data not exists in redis!!!');
                    client.select(1);
                    client.set(dataObj.id, dataObj.data);
                    console.log("dataStorage update");
                    client.select(2);
                    client.set(dataObj.id, dataObj.parent);
                    console.log("dataMap update");
                    console.log("data are save in redis")

                }
            })

    .catch(
        (err) => {
            console.log("error in connect to redis", err);
        })
}


/// get refis

const getRedis = (request, response) => {

    client.select(1);
    client.exists(dataObj.id)
        .then(
            (reply) => {

                if (reply === 1) {

                    console.log('data exists in redis');
                    client.select(1);
                    client.get(dataObj.id).then((value) => {
                        console.log('id:', dataObj.id, 'data:', value)
                    })
                    client.select(2);
                    client.get(dataObj.id).then((value) => {
                        console.log('id:', dataObj.id, 'parent:', value)
                    })

                } else {
                    console.log('data not exists in redis!!!');

                }
            })
        .catch(
            (err) => {
                console.log("error in connect to redis");

            })

}

//// put redis


const putRedis = (request, response) => {

    client.select(1);
    client.exists(dataObj.id)
        .then(
            (reply) => {
                if (reply === 1) {

                    console.log('data exists in redis');

                    client.select(1);
                    client.set(dataObj.id, dataObj.data);
                    console.log("dataStorage update");
                    client.select(2);
                    client.set(dataObj.id, dataObj.parent);
                    console.log("dataMap update");



                } else {
                    console.log('data not exists in redis!!!');
                }
            })
        .catch(
            (err) => {
                console.log("error in connect to redis", err);
            })

}

module.exports = {
    setRedis,
    getRedis,
    putRedis
};