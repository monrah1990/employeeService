const http = require('http');
const url = require('url');
const { routes } = require('./routes.js');

function start() {
    function onRequest(request, response) {

        let req = {
            method: request.method,
            pathname: url.parse(request.url, true).pathname,
        }
        console.log('Request for ' + req.pathname + ' pathname and ' + req.method + ' method' + ' received.');

        let body = '';
        if (req.method === 'POST' || req.method === 'PUT') {
            request.on('data', (chunk) => {
                body += chunk;
            });
            request.on('end', () => {
                req.body = JSON.parse(body);
                routes(req, response);
            });
        } else {
            req.query = url.parse(request.url, true).query;
            // req.existQuery = 'id' in req.query;
            routes(req, response);
        }


    }
    http.createServer(onRequest).listen(8181);
    console.log('The employee server has started.');
}
exports.start = start;