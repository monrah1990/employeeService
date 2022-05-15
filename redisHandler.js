const client = require('./redis');
const respond = require('./responseHandler');

function setRedis(body, response) {

    let id = body.id;
    let data = body.data;
    let parent = body.parent;

    client.select(1);
    client.exists(id, (reply, err) => {
            return reply
        })
        .then((reply) => {

            if (reply === 1) {

                console.log('data exists in redis');
                respond[409](response);

            } else {

                client.select(2);
                client.exists(parent, (reply, err) => {
                        return reply;
                    })
                    .then((reply) => {

                        if (reply === 1) {
                            console.log('parent exists in redis');

                            client.select(1);
                            client.hSet(id, data);
                            console.log('save to dataStorage');
                            client.select(2);
                            client.hSet(parent, `id.${id}`, id);
                            console.log('save to dataMap');
                            console.log('data are saved in redis');
                            respond[200](response);

                        } else {
                            console.log('parent dosent exists in redis');
                            client.select(1);
                            client.hSet(id, data);
                            console.log('save to dataStorage');
                            client.select(2);
                            client.hSet(id, `id.${id}`, id);
                            console.log('save to dataMap');
                            console.log('data are saved in redis');
                            respond[200](response);
                        }
                    })
            }

        }).catch((err) => {
            console.log('error in connect to redis', err);
            respond[500](response);
        })



}
///// put
function putRedis(body, response) {

    let id = body.id;
    let data = body.data;
    let parent = body.parent;

    client.select(1);
    client.exists(id, (reply, err) => {
            return reply
        })
        .then((reply) => {

            if (reply !== 1) {

                console.log('data dosent exists in redis');
                respond[201](response);

            } else {

                client.hSet(id, data);
                console.log('dataStorage updated');
                client.select(2);
                client.hSet(parent, `id.${id}`, id);
                console.log('dataMap updated');
                respond[200](response);
            }
        }).catch((err) => {
            console.log('error in connect to redis', err);
            respond[500](response);
        })
}
//// get
function getRedis(req, response) {

    let id = req.params.id;

    getInfo = {};
    getInfo.id = id;

    client.select(1);
    client.hGetAll(id, (data, err) => {
            // reply = (JSON.parse(JSON.stringify(reply)))
            return data
        })
        .then((data) => {


            if (!data.userName) {

                console.log('data dosent exists in redis');
                respond[201](response);
            }
            return data;

        })
        .then((data) => {

            getInfo.data = data;

            client.select(2);
            client.hGetAll(id, (parent) => {
                    return parent;
                })
                .then((parent) => {
                    getInfo.parent = parent;

                    respond[203](getInfo, response)
                })

        })
        .catch((err) => {
            console.log('error in connect to redis', err);
            respond[500](response);
        })
}
exports.setRedis = setRedis;
exports.putRedis = putRedis;
exports.getRedis = getRedis;