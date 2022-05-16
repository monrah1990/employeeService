const client = require('./redis');
const { setRedis, getRedis, putRedis } = require('./redisHandler');
const respond = require('./responseHandler');
const { validBody, validParam } = require('./validation');

// postHandler

function post(req, response) {

    body = JSON.parse(req.body);
    let validate = validBody(body);

    if (!validate) {
        console.log('Please cheack body');
        respond[400](response);
    } else {

        setRedis(body, response);
    }

}
////  put
function put(req, response) {

    body = JSON.parse(req.body);
    let validate = validBody(body);


    if (!validate) {
        console.log('Please cheack body');
        respond[400](response);
    } else {

        putRedis(body, response);
    }
}
//// get
function get(req, response) {


    // let param = JSON.parse(JSON.stringify(req.params));
    let param = req.params;
    let validate = validParam(param);

    if (!validate) {
        console.log('please cheack query');
        respond[400](response);
    } else {

        getRedis(req, response);
    }
}
exports.post = post;
exports.put = put;
exports.get = get;


// if (!body.id || !body.data || !body.parent) {
//     console.log('Please cheack body');
//     respond[400](response);
// } else {

//     setRedis(body, response);
// }