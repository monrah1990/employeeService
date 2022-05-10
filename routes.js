const { postHandler, getHandler, putHandler, defaultHandler, urlHandler } = require('./controller.js');
const clientData = require('./clientData');

const routes = (request, response) => {

    const reqURL = request.url;
    const reqMethod = request.method;

    let data = "";
    request.on('data', (chunk) => {
        data += chunk;
        dataObj = JSON.parse(data);

    });


    switch (reqMethod) {

        case "POST":
            {
                if (reqURL === '/dataService') {
                    postHandler(request, response);
                } else {
                    urlHandler(request, response)
                }
                break;
            }
        case "GET":
            {
                if (reqURL === '/dataService') {
                    getHandler(request, response);
                } else {
                    urlHandler(request, response);
                }
                break;
            }
        case "PUT":
            {
                if (reqURL === '/dataService') {
                    putHandler(request, response);
                } else {
                    urlHandler(request, response);
                }
            }
            break;
        default:
            {
                defaultHandler(request, response);
            }


    }

}
module.exports = { routes };