const { postHandler, defaultHandler } = require('./controller.js');

const routes = (request, response) => {
    const reqURL = request.url;
    const reqMethod = request.method;

    switch (reqMethod) {
        case "POST":
            {
                if (reqURL === '/dataService') {
                    postHandler(request.response);
                }
                break;
            }
        default:
            {
                defaultHandler(request, response);
            }
    }
};
module.exports = { routes };

/* '/': (request, response) => {
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
} */