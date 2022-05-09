 const setRedis = require('./setRedis.js');
 const getRedis = require('./getRedis.js');
 const putRedis = require('./putRedis.js');



 // postHandler

 const postHandler = (request, response) => {

     let data = '';

     request.on('data', (chunk) => {
         data += chunk;
         console.log('data', data);

     });

     request.on('end', (response) => {
         data = JSON.parse(data);
         console.log('data', data);

         setRedis(request, response, data);

         console.log('POST Successfull')
     });
     response.write(
         JSON.stringify({
             message: "POST Successfull",
         })
     );
     response.end();

 }



 // getHandler

 const getHandler = (request, response) => {
     const dataa = getRedis(request, response, dataObj);
     const data = {
         name: "frontendguruji",
         category: "technology",
         website: "frontendguruji.com",
     };

     response.writeHead(200, {
         "Content-Type": "application/json",
     });
     response.write(
         JSON.stringify({
             message: "GET Successfull",
             data,
         })
     );
     response.end();
 }


 // putHandler

 const putHandler = (request, response) => {

     let data = '';

     request.on('data', (chunk) => {
         data += chunk;
         console.log('data', data);

     });

     request.on('end', (response) => {
         data = JSON.parse(data);
         console.log('data', data);

         putRedis(request, response, data);

         console.log('PUT Successfull')
     });
     response.write(
         JSON.stringify({
             message: "PUT Successfull",

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
         message: 'Welcome to client server',
     }));
     response.end();
 };


 //// urlHandler
 const urlHandler = (request, response) => {
     response.writeHead(404, {
         "Content-Type": "application/json"
     });
     response.write(JSON.stringify({
         message: 'Resource not found',
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