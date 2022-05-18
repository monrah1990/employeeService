const server = require('./server/server');
const router = require('./routing/routes');
const controller = require('./controller/controller');

let handle = {};
handle['/dataService'] = {
    'POST': controller.post,
    'GET': controller.get,
    'PUT': controller.put
}

server.start(router.routes, handle);