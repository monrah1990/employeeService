const client = require('./redis');
const { setRedis, getRedis, putRedis } = require('./redisHandler');
const respond = require('./responseHandler');

// postHandler
function post(req, response) {

    body = JSON.parse(req.body);

    if (!body.id || !body.data || !body.parent) {
        console.log('Please cheack body');
        respond[400](response);
    } else {

        setRedis(body, response);
    }
}
////  put
function put(req, response) {

    body = JSON.parse(req.body);

    if (!body.id || !body.data || !body.parent) {
        console.log('please cheack body');
        respond[400](response);
    } else {

        putRedis(body, response);
    }
}
//// get
function get(req, response) {
    // req.params = (JSON.parse(JSON.stringify(req.params)));

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