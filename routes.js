const respond = require('./responseHandler');
const { postHandler, putHandler, getHandler, defaultHandler } = require("./controler");

const routes = (req, response) => {

    console.log("About to route a request for " + req.pathname);

    if (req.pathname === '/dataService') {

        switch (req.method) {

            case "POST":
                {
                    postHandler(req, response);
                    break;
                }
            case "GET":
                {
                    getHandler(req, response);
                    break;
                }
            case "PUT":
                {
                    putHandler(req, response);
                }
                break;
            default:
                {
                    defaultHandler(req, response);
                }

        }

    } else {
        console.log('No request handler found for' + req.pathname);
        respond[404](response);
    }
}

module.exports = { routes };