const httpHandlers = require('./httpHandlers.js');
const routes = {
    '/': (request, response) => {
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.write(
            JSON.stringify({
                message: `API not found at ${request.url}`,
            })
        );
        response.end();

    },
    '/dataService': (request, response) => {
        return httpHandlers.httpHandlers(request, response)
    }
}
exports.routes = routes;