const respond = require('./responseHandler');
const { postHandler, putHandler, getHandler, defaultHandler } = require("./controller");

function routes(req, response, handle) {

    console.log("About to route a request for " + req.pathname);

    if (typeof handle[req.pathname] === 'object') {
        return handle[req.pathname][req.method](req, response);
    } else {
        console.log("No request handler found for " + req.pathname + req.method);
        respond[404](response);
    }
}
exports.routes = routes;