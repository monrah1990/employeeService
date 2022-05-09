const httpHandler = require('./httpHandlers.js');

let res = {
    "": function index(request, response) {
        response.writeHead(200);
        response.end('Data save')
    },

    "/foo": function index(request, response) {
        response.writeHead(200);
        response.end('url is foo')
    },
    "/count": function index(request, response) {
        response.writeHead(200);
        response.end('url is count')
        return httpHandler.countNumber(request, response)
    },
    "/login": function index(request, response) {
        response.end('url is count')
        return httpHandler.login(request, response)
    }
}
exports.routes = routes;