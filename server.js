const http = require('http');

const routes = require('./router.js');

const router = routes.routes;

http.createServer((request, response) => {
    if (request.url in router) {
        return router[request.url](request, response)
    } else {
        response.writeHead(404);
        response.end('oooops');
    }

}).listen(8181);