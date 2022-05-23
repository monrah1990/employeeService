const respond = require('../controller/responseHandler');
const { postHandler, putHandler, getHandler, defaultHandler } = require("../controller/controller");
const { status, message } = require('../controller/status');

function routes(req, response, handle) {

    console.log("About to route a request for " + req.pathname);

    if (typeof handle[req.pathname] === 'object' && req.method in handle[req.pathname]) {
        return handle[req.pathname][req.method](req, response);
    } else {
        console.log("No request handler found for " + req.pathname + ' ' + req.method);
        respond(status.badRequest, message.badReq, response);
    }
}
exports.routes = routes;