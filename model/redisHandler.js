const client = require('./redis');
const respond = require('../controller/responseHandler');
const { status, message } = require('../controller/status');
const { resolveRef } = require('ajv/dist/compile');

async function setRedis(body, response) {
    let id = body.id;
    let data = body.data;
    let parent = body.parent;

    try {
        client.select(1);

        let existId = await client.exists(id);

        if (existId === 1) {
            console.log({

                status: status.conflict,
                message: message.dupId
            });

            respond(status.conflict, message.dupId, response);


        } else {

            client.select(2);
            let existParent = await client.exists(parent);

            if (id === parent || existParent) {

                client.select(1);
                client.hSet(id, data);
                console.log({
                    status: status.postPut,
                    message: message.saveStor
                });
                client.select(2);
                client.set(id, parent);

                console.log({
                    status: status.postPut,
                    message: message.saveMap
                });
                console.log('Data are saved in redis');
                respond(status.postPut, message.save, response);

            } else {
                console.log({

                    status: status.conflict,
                    message: message.checkParent
                });

                respond(status.conflict, message.checkParent, response);


            }

        }
    } catch {
        (err) => {

            console.log({
                status: status.error,
                message: message.error
            });

            respond(status.error, message.error, response);


        }
    }


}
///// put
async function putRedis(body, response) {

    let id = body.id;
    let data = body.data;
    let parent = body.parent;

    try {
        client.select(1);

        let existId = await client.exists(id);

        if (!existId) {

            console.log({

                status: status.notFound,
                message: message.noId
            });

            respond(status.notFound, message.noId, response);

        } else {

            client.select(2);
            let existParent = await client.exists(parent);

            if (id === parent || existParent) {
                console.log('admin or parent exists');
                client.select(1);
                client.hSet(id, data);

                console.log('dataStorage updated');
                client.select(2);
                client.set(id, parent);
                console.log('dataMap updated');

                console.log({

                    status: status.postPut,
                    message: message.update
                });

                respond(status.postPut, message.update, response);

            } else {
                console.log({

                    status: status.conflict,
                    message: message.checkParent
                });

                respond(status.conflict, message.checkParent, response);


                console.log('Please check your parenttt')

            }
        }
    } catch {
        (err) => {
            console.log({

                status: status.error,
                message: message.error
            });

            respond(status.error, message.checkParent, response);

        }
    }
}
//// get
async function getRedis(req, response) {

    let id = req.params.id;

    getInfo = {};
    getInfo.id = id;
    try {
        client.select(1);
        let data = await client.hGetAll(id);

        if (Object.keys(data).length === 0) {

            console.log({

                status: status.notFound,
                message: message.noId
            });

            respond(status.notFound, message.noId, response);
        }

        getInfo.data = data;

        client.select(2);
        let parent = await client.get(id);

        getInfo.parent = parent;
        // respond[202](getInfo, response);
        console.log({

            status: status.ok,
            message: message.get
        });


        let message2 = message.get + JSON.stringify(getInfo)



        respond(status.ok, message2, response);



    } catch {
        (err) => {
            console.log({

                status: status.error,
                message: message.error
            });

            respond(status.error, message.checkParent, response);

        }
    }
}
exports.setRedis = setRedis;
exports.putRedis = putRedis;
exports.getRedis = getRedis;