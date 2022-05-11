function res(request, response) {

    response.writeHead(200, {
        "Content-Type": "application/json"
    });
    response.write(JSON.stringify({
        message: 'Welcome to client server'
    }));
    response.end();
};

module.exports = res;
