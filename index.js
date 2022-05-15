const server = require('./server');
const router = require('./routes');
const controller = require('./controller');

let handle = {};
handle['/dataService'] = {
    'POST': controller.post,
    'GET': controller.get,
    'PUT': controller.put
}

server.start(router.routes, handle);