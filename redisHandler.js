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

                console.log('ID is duplicated');
                respond[409](response);

            } else {

                client.select(2);
                client.exists(parent, (reply, err) => {
                        return reply;
                    })
                    .then((reply) => {

                        if (reply === 1) {

                            console.log('Parent exists in redis');
                            client.select(1);
                            client.hSet(id, data);
                            console.log('Save to dataStorage');
                            client.select(2);
                            client.set(id, parent);
                            console.log('Save to dataMap');
                            console.log('Data are saved in redis');
                            respond[201](response);

                        } else {
                            console.log('parent dosen\'t exists in redis');
                            client.select(1);
                            client.hSet(id, data);
                            console.log('Save to dataStorage');
                            client.select(2);
                            client.set(id, id);
                            console.log('Save to dataMap')
                            console.log('Data are saved in redis');
                            respond[201](response);
                        }
                    })
            }

        }).catch((err) => {
            console.log('Error in connect to redis', err);
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

                console.log('Data dosen\'t exists in redis');
                respond[405](response);

            } else {

                client.hSet(id, data);
                console.log('dataStorage updated');
                client.select(2);
                client.set(id, parent);
                console.log('dataMap updated');
                respond[201](response);
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

            return data
        })
        .then((data) => {


            if (Object.keys(data).length === 0) {

                console.log('Data dosen\'t exists in database');
                respond[405](response);
            }
            return data;

        })
        .then((data) => {

            getInfo.data = data;

            client.select(2);
            client.get(id, (parent) => {
                    return parent;
                })
                .then((parent) => {
                    getInfo.parent = parent;

                    respond[202](getInfo, response)
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