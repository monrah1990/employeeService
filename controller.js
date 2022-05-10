const { setRedis, getRedis, putRedis } = require('./redisHandler.js');



// postHandler

const postHandler = (request, response) => {

    request.on('end', (response) => {

        setRedis(request, response);

        console.log('POST Successfull');

    });

    response.writeHead(200, {
        "Content-Type": "application/json"
    });
    response.write(
        JSON.stringify({
            message: "P Successfull"
        })
    );
    response.end();


}

// getHandler

const getHandler = (request, response) => {

    request.on('end', (response) => {

        getRedis(request, response);

        console.log('GET Successfull');

    });

    response.writeHead(200, {
        "Content-Type": "application/json"
    });
    response.write(
        JSON.stringify({
            message: "GET Successfull"
        })
    );
    response.end();
}


// putHandler

const putHandler = (request, response) => {

    request.on('end', (response) => {

        putRedis(request, response);

        console.log('PUT Successfull')
    });
    response.write(
        JSON.stringify({
            message: "PUT Successfull"

        })
    );
    response.end();

}

// defaultHandler
const defaultHandler = (request, response) => {
    response.writeHead(200, {
        "Content-Type": "application/json"
    });
    response.write(JSON.stringify({
        message: 'Welcome to client server'
    }));
    response.end();
};


//// urlHandler
const urlHandler = (request, response) => {
    response.writeHead(404, {
        "Content-Type": "application/json"
    });
    response.write(JSON.stringify({
        message: 'URL Not Found'
    }));
    response.end();
};



module.exports = {
    postHandler,
    getHandler,
    defaultHandler,
    putHandler,
    urlHandler

};