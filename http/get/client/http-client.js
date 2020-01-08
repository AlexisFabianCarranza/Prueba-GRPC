var request = require('request');
const IP_HOST = process.env.IP_HOST || '0.0.0.0';


function hello(name) {
    let start =new Date();
    console.log(start)
    return request('http://'+IP_HOST+':5001/hello?name=' + name, function (error, response, body) {
        //console.log('error:', error); // Print the error if one occurred
        //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        let end=new Date();
        console.log(end)
        console.log(end-start)
        console.log('body:', body); // Print the HTML for the Google homepage.
        return response;
    });
}

function helloClientSide(req, res) {
    /*   try {
               var client = new greeting_proto.GreetingService('0.0.0.0' + ':50051',
                   grpc.credentials.createInsecure());
               return new Promise((resolve, reject) => {
                       client.helloClientSide({},
                           (error, response) => {
                                   if (error) {
                                           return reject(error);
                                   }
                                   console.log(response);
                                   return resolve(response);
                           });
               });
       } catch (e) {
               console.error(e);
       }*/
}

function helloServerSide(req, res) {
    /*   try {
               var client = new greeting_proto.GreetingServiceServerSide('0.0.0.0' + ':50051',
                   grpc.credentials.createInsecure());
               return new Promise(async (resolve, reject) => {
                       let call = client.helloServerSide({});
                       call.on('data', function(feature) {
                               console.log(feature);
                               res.send(feature)
                       });
                       /!*call.on('end', function() {
                               res.send('Finalizo la comunicacion');
                       });*!/
               });
       } catch (e) {
               console.error(e);
       }*/
}

function helloBidirectional(req, res) {
    /* try {
             var client = new greeting_proto.GreetingService('0.0.0.0' + ':50051',
                 grpc.credentials.createInsecure());
             return new Promise((resolve, reject) => {
                     client.hello({},
                         (error, response) => {
                                 if (error) {
                                         return reject(error);
                                 }
                                 console.log(response);
                                 return resolve(response);
                         });
             });
     } catch (e) {
             console.error(e);
     }*/
}

module.exports = {
    hello,
    helloClientSide,
    helloServerSide,
    helloBidirectional
};