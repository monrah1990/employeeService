const http = require('http');

const { routes } = require('./routes.js');


http.createServer((request, response) => {
    routes(request, response);
}).listen(8181);

/* if (request.url in router) {
    return router[request.url](request, response)
} else {
    response.writeHead(404);
    response.end('oooops');
}
 */