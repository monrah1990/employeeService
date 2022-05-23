const client = require('../model/redis');
const { setRedis, getRedis, putRedis } = require('../model/redisHandler');
const respond = require('./responseHandler');

const { validBody, validParam } = require('./validation');
const { status, message } = require('./status');

// postHandler

function post(req, response) {

    body = JSON.parse(req.body);

    let validate = validBody(body);

    if (!validate) {
        console.log({
            status: status.badRequest,
            message: message.checkBody
        });
        respond(status.badRequest, message.checkBody, response);

    } else {
        setRedis(body, response)
            .then((res) => {
                console.log(res);
                respond(res.status, res.message, response);
            })
            .catch((res) => {
                console.log(res);
                respond(res.status, res.message, response);

            });


    }
}
////  put
function put(req, response) {

    body = JSON.parse(req.body);
    let validate = validBody(body);

    if (!validate) {
        console.log({
            status: status.badRequest,
            message: message.checkBody
        });
        respond(status.badRequest, message.checkBody, response);
    } else {

        putRedis(body, response)
            .then((res) => {
                console.log(res);
                respond(res.status, res.message, response);
            })
            .catch((res) => {
                console.log(res);
                respond(res.status, res.message, response);

            });

    }
}
//// get
function get(req, response) {


    // let param = JSON.parse(JSON.stringify(req.params));
    let param = req.params;
    let validate = validParam(param);

    if (!validate) {
        console.log({
            status: status.badRequest,
            message: message.checkQuery
        });
        respond(status.badRequest, message.checkQuery, response);
    } else {

        getRedis(req, response)
            .then((res) => {
                console.log(res);
                respond(res.status, res.message, response);
            })
            .catch((res) => {
                console.log(res);
                respond(res.status, res.message, response);

            });
    }
}
exports.post = post;
exports.put = put;
exports.get = get;