// const { getSystemErrorMap } = require("util");

const respond = {
    '200': (response) => {
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.write('OK\nYour request is done.');
        response.end();

    },
    '201': (response) => {
        response.writeHead(201, { 'Content-Type': 'text/plain' });
        response.write('data dosent exists in redis!!!');
        response.end();

    },
    '202': (response) => {
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.write('data are saved or updated in redis');
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
    '409': (response) => {
        response.writeHead(409, { 'Content-Type': 'text/plain' });
        response.write('Id is duplicated.');
        response.end();

    },
    '500': (response) => {
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.write('Internal Error\nerror in connect to dataBase.');
        response.end();

    },
    '203': (info, response) => {

        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.write('here you are:' + JSON.stringify(info));
        response.end();
    },





}
module.exports = respond;