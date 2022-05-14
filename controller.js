const client = require('./redis');
const { setRedis } = require('./redisHandler');
const respond = require('./responseHandler');

// postHandler
const postHandler = (req, response) => {

    req.existId = 'id' in req.body;
    req.existData = 'data' in req.body;
    req.existParent = 'parent' in req.body;


    if (req.existId === false || req.existData === false || req.existParent === false) {
        console.log('please cheack body');
        respond[400](response);

    } else {

        let id = req.body.id;
        let data = req.body.data;
        let parent = req.body.parent;

        client.select(1);
        client.exists(id)
            .then(
                (reply) => {

                    if (reply === 1) {

                        console.log('data exists in redis');
                        respond[409](response);

                    } else {

                        console.log('data not exists in redis!!!');
                        client.select(1);
                        client.hSet(id, data);
                        console.log('save to dataStorage');

                        client.select(2);
                        client.hSet(id, parent);
                        console.log('save to dataMap');
                        console.log('data are saved in redis');
                        respond[200](response);


                    }
                })

        .catch(
            (err) => {
                console.log('error in connect to redis', err);
                respond[500](response);
            })

    }
}

//putHandler
const putHandler = (req, response) => {


    req.existId = 'id' in req.body;
    req.existData = 'data' in req.body;
    req.existParent = 'parent' in req.body;

    if (req.existId === false || req.existData === false || req.existParent === false) {
        console.log('please cheack body');
        respond[400](response);

    } else {

        let id = req.body.id;
        let data = req.body.data;
        let parent = req.body.parent;

        client.select(1);
        client.exists(id)
            .then(
                (reply) => {

                    if (reply === 1) {

                        console.log('data exists in redis!!!');
                        client.select(1);
                        client.hSet(id, data);
                        console.log('dataStorage updated');
                        client.select(2);
                        client.hSet(id, parent);
                        console.log('dataMap updated');
                        console.log('data are saved in redis');
                        respond[200](response);


                    } else {
                        console.log('data dosent exists in redis');
                        respond[201](response);


                    }
                })

        .catch(
            (err) => {
                console.log("error in connect to redis", err);
                respond[500](response);
            })

    }
}

//getHandler

const getHandler = (req, response) => {

    req.existQuery = 'id' in req.query;

    if (req.existQuery === false) {
        console.log('please check query');
        respond[404](response);

    } else {

        let id = req.query.id;
        async function set(req, response) {

            await client.select(1);
            let result = await client.exists(id);
            console.log(result)
                // if (result === 1) {
            let getdata = await client.hGetAll(id);
            let data = JSON.parse(JSON.stringify(getdata));


            await client.select(2);
            await client.exists(id);
            let getparent = await client.hGetAll(id);
            let parent = JSON.parse(JSON.stringify(getparent));

            let info = {
                'id': id,
                'data': data,
                'parent': parent
            }
            return info;
            // } else {
            //     console.log('data not exists in redis!!!');
            // }

        }
        set().then(
            (info) => {
                console.log(typeof info)
                respond[500](info, response);
            });
    }
}



//defaultHandler
const defaultHandler = (req, response) => {

    respond[404](response);
}

module.exports = {
    postHandler,
    putHandler,
    getHandler,
    defaultHandler
}