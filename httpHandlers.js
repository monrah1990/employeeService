const emitter = require('./event.js');
emitter.on('please', () => {
    console.loge('recive');
})
const httpHandlers = (request, response) => {
    response.writeHead(200);
    response.end('Hellooooo')
}
const database = (request, response) => {
    c
}
exports.httpHandlers = httpHandlers;