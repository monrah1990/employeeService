const eventEmitter = require('events');

const emitter = new eventEmitter();
emitter.emit('please')

module.exports = emitter;