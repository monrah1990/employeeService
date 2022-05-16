// const { getSystemErrorMap } = require("util");

const respond = {
    '201': (response) => {
        response.writeHead(201, { 'Content-Type': 'text/plain' });
        response.write('Your request is done.');
        response.end();

    },
    '203': (response) => {
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.write('Data dosen\'t exists in database!!!');
        response.end();

    },
    '202': (getInfo, response) => {

        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.write('here you are:' + JSON.stringify(getInfo));
        response.end();
    },
    '400': (response) => {
        response.writeHead(400, { 'Content-Type': 'text/plain' });
        response.write('Bad request\nplease cheack body or query.');
        response.end();
    },
    '404': (response) => {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.write('URL Not found.\nPlease check url, method and body.');
        response.end();
    },
    '405': (response) => {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.write('The server can not find ID, please change it');
        response.end();
    },
    '409': (response) => {
        response.writeHead(409, { 'Content-Type': 'text/plain' });
        response.write('Id is duplicate');
        response.end();

    },
    '500': (response) => {
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.write('Internal Error\nError in connect to dataBase.');
        response.end();

    }

}
module.exports = respond;