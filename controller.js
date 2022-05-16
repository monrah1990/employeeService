const client = require('./redis');
const { setRedis, getRedis, putRedis } = require('./redisHandler');
const respond = require('./responseHandler');
const valid = require('./validation');

// postHandler

function post(req, response) {

    body = JSON.parse(req.body);
    let validate = valid(body);

    if (!validate) {
        console.log('Please cheack body');
        respond[400](response);
    } else {

        setRedis(body, response);
    }

    // if (!body.id || !body.data || !body.parent) {
    //     console.log('Please cheack body');
    //     respond[400](response);
    // } else {

    //     setRedis(body, response);
    // }
}
////  put
function put(req, response) {

    body = JSON.parse(req.body);
    let validate = valid(body);

    if (!validate) {
        console.log('Please cheack body');
        respond[400](response);
    } else {

        putRedis(body, response);
    }
}
//// get
function get(req, response) {


    if (!req.params.id) {
        console.log('please cheack query');
        respond[400](response);
    } else {

        getRedis(req, response);
    }
}
exports.post = post;
exports.put = put;
exports.get = get;