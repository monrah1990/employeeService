const client = require('./redis');
const respond = require('./responseHandler');

async function setRedis(body, response) {

    let id = body.id;
    let data = body.data;
    let parent = body.parent;
    try {
        client.select(1);

        let existId = await client.exists(id);

        if (existId === 1) {

            console.log('ID is duplicated');
            respond[409](response);

        } else {

            client.select(2);
            let existParent = await client.exists(parent);

            if (id === parent || existParent) {
                console.log('admin or parent exists');
                client.select(1);
                client.hSet(id, data);
                console.log('Save to dataStorage');
                client.select(2);
                client.set(id, parent);
                console.log('Save to dataMap')
                console.log('Data are saved in redis');
                respond[201](response);


            } else {
                console.log('Please check your parent')
                respond[410](response)
            }

        }
    } catch {
        (err) => {
            console.log('Error in connect to redis', err);
            respond[500](response);
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

            console.log('Data dosen\'t exists in redis');
            respond[405](response);

        } else {

            client.select(2);
            let existParent = client.exists(parent);

            if (!existParent || id != parent) {
                console.log('Please check your parent')
                respond[410](response)

            } else {
                console.log('admin or parent exists');
                client.select(1);
                client.hSet(id, data);
                console.log('dataStorage updated');
                client.select(2);
                client.set(id, parent);
                console.log('dataMap updated');
                respond[201](response);

            }
        }
    } catch {
        (err) => {
            console.log('Error in connect to redis', err);
            respond[500](response);
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

            console.log('Data dosen\'t exists in database');
            respond[405](response);
        }

        getInfo.data = data;

        client.select(2);
        let parent = await client.get(id);
        getInfo.parent = parent;
        respond[202](getInfo, response);


    } catch {
        (err) => {
            console.log('error in connect to redis', err);
            respond[500](response);
        }
    }
}
exports.setRedis = setRedis;
exports.putRedis = putRedis;
exports.getRedis = getRedis;