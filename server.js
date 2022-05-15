const http = require('http');
const url = require('url');


function start(routes, handle) {
    function onRequest(request, response) {
        let req = {
            method: request.method,
            pathname: url.parse(request.url, true).pathname,
            params: url.parse(request.url, true).query,
            body: ''
        }
        console.log('Request for ' + req.pathname + ' pathname and ' + req.method + ' method' + ' received.');
        req.setEncoding('utf8');
        request.on('data', (chunk) => {
            req.body += chunk;
        });
        request.on('end', () => {

            routes(req, response, handle);

        });

    }
    http.createServer(onRequest).listen(8181);
    console.log('The employee server has started.');
}
exports.start = start;