const http = require('http');
const { routes } = require('./routes.js');


http.createServer((request, response) => {

    routes(request, response);

}).listen(8181);