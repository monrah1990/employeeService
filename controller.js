const storeToRedis = require('./stoteToRedis.js');


// postHandler

const postHandler = (request, response) => {

    let chunks = [];
    request.on("data", (chunk) => {
        chunks.push(chunk);
    });

    request.on("end", () => {

        const data = Buffer.concat(chunks);
        const querystring = data.toString(); // body += chunk;
        const parsedData = new URLSearchParams(querystring);
        const dataObj = {};
        for (var pair of parsedData.entries()) {
            dataObj[pair[0]] = pair[1];
        }
        console.log("dataObj: ", dataObj);

        response.writeHead(200, {
            "Content-Type": "application/json"
        });
        response.write(
            JSON.stringify({
                message: "POST Successfull",

            })
        );
        response.end();

        storeToRedis(request, response, dataObj);

        console.log('OK')



    });

};


// getHandler
const getHandler = (request, response) => {
    const data = {
        id: "09123456789",
        dta: "ali azimi",
        parent: "arian ahad"
    };
    response.writeHead(200, {
        "Content-Type": "application/json"
    });
    response.write(
        JSON.stringify({
            message: "GET Successfull",
            data,
        })
    );
    response.end();
    console.log(data)
};

// getHandler
const putHandler = (request, response) => {
    const data = {
        id: "09123456789",
        dta: "ali azimi",
        parent: "arian ahad"
    };
    response.writeHead(200, {
        "Content-Type": "application/json"
    });
    response.write(
        JSON.stringify({
            message: "put Successfull",
            data,
        })
    );
    response.end();
    console.log(data)
};

// defaultHandler
const defaultHandler = (request, response) => {
    response.writeHead(200, {
        "Content-Type": "application/json"
    });
    response.write(JSON.stringify({
        message: 'Welcome to client server',
    }));
    response.end();
};


//// urlHandler
const urlHandler = (request, response) => {
    response.writeHead(400, {
        "Content-Type": "application/json"
    });
    response.write(JSON.stringify({
        message: 'The url not found',
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

/*  const firstValue = dataObj[Object.keys(dataObj)[0]]; // 👉️ '1'
         console.log(firstValue); */
/* const keys = Object.keys(dataObj) // 👉️ ['one', 'two', 'three']
console.log(keys) */

/* 
for (var pair of parsedData.entries()) {
    dataObj[pair[0]] = pair[1];
}

for (var k in dataObj) {
    console.log(k + ": " + dataObj[k]);
}

console.log("dataObj: ", dataObj); */