let status = {
    'ok': '200',
    'postPut': '201',
    'get:': '200',
    'badRequest': '400',
    'notFound': '404',
    'conflict': '409',
    'error': '500'

}
let message = {
    'save': 'Data are saved in database ',
    'update': 'Data are updated',
    'get': 'your data',

    'noId': 'The server can not find ID, please change it',
    'db': 'Data dosen\'t exists in database!!!',
    'notExists': 'Parent not exist',
    'dupId': 'Id is duplicate',
    'checkBody': 'Please check body',
    'checkParent': 'please check parent',
    'checkQuery': 'Please check query',
    'badReq': 'Bad request\nplease cheack body or query.',
    'url': 'URL Not found.\nPlease check url, method and body.',
    'saveStor': 'Save to dataStorage',
    'saveMap': 'Save to dataMap',
    'error': 'Internal Error\nError in connect to dataBase.',
}
module.exports = {
    status,
    message
}