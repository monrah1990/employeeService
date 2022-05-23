const client = require('./redis');

const { status, message } = require('../controller/status');


async function setRedis(body, response) {
    let id = body.id;
    let data = body.data;
    let parent = body.parent;

    try {
        client.select(1);

        let existId = await client.exists(id);

        if (existId === 1) {

            let res = {
                'status': status.conflict,
                'message': message.dupId,
            }

            return res;
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

                let res = {
                    'status': status.postPut,
                    'message': message.save,
                }
                return res;

            } else {
                let res = {
                    'status': status.conflict,
                    'message': message.checkParent,
                }
                return res;
            }

        }
    } catch (err) {


        let res = {
            'status': status.error,
            'message': message.error,
        }

        return res;




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

            let res = {
                'status': status.notFound,
                'message': message.noId,
            }

            return res;


        } else {

            client.select(2);
            let existParent = await client.exists(parent);

            if (id === parent || existParent) {
                console.log('parent exists or they are admin');
                client.select(1);
                client.hSet(id, data);

                console.log('dataStorage updated');
                client.select(2);
                client.set(id, parent);
                console.log('dataMap updated');

                let res = {
                    'status': status.postPut,
                    'message': message.update,
                }

                return res;


            } else {
                console.log('Please check your parenttt')
                let res = {
                    'status': status.conflict,
                    'message': message.checkParent,
                }

                return res;

            }
        }
    } catch (err) {
        let res = {
            'status': status.error,
            'message': message.error,
        }

        return res;


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
            let res = {
                'status': status.notFound,
                'message': message.noId,
            }

            return res;
        }

        getInfo.data = data;

        client.select(2);
        let parent = await client.get(id);

        getInfo.parent = parent;
        let res = {
            'status': status.ok,
            'message': getInfo,
        }

        return res;


    } catch (err) {
        let res = {
            'status': status.error,
            'message': message.error,
        }

        return res;


    }
}

exports.setRedis = setRedis;
exports.putRedis = putRedis;
exports.getRedis = getRedis;