function respond(status, message, response) {
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({
        data: message,
    }));
}
module.exports = respond;

























// '201': (response) => {
//     response.writeHead(201, { 'Content-Type': 'application/json' });
//     response.end('Your request is done.');
// },
// '203': (response) => {
//     response.writeHead(404, { 'Content-Type': 'application/json' });
//     response.end('Data dosen\'t exists in database!!!');

// },
// '202': (getInfo, response) => {

//     response.writeHead(200, { 'Content-Type': 'application/json' });
//     response.end('here you are:' + JSON.stringify(getInfo));
// },
// '400': (response) => {
//     response.writeHead(400, { 'Content-Type': 'application/json' });
//     response.end('Bad request\nplease cheack body or query.');
// },
// '404': (response) => {
//     response.writeHead(404, { 'Content-Type': 'application/json' });
//     response.end('URL Not found.\nPlease check url, method and body.');
// },
// '405': (response) => {
//     response.writeHead(404, { 'Content-Type': 'application/json' });
//     response.end('The server can not find ID, please change it');
// },
// '409': (response) => {
//     response.writeHead(409, { 'Content-Type': 'application/json' });
//     response.end('Id is duplicate');

// },
// '410': (response) => {
//     response.writeHead(409, { 'Content-Type': 'application/json' });
//     response.end('please check parent');

// },
// '500': (response) => {
//     response.writeHead(500, { 'Content-Type': 'text/plain' });
//     response.end('Internal Error\nError in connect to dataBase.');

// }


// module.exports = respond;