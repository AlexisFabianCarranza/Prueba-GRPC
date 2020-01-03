var PROTO_PATH = '../greeting.proto';
var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');

var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
);

var greeting_proto = grpc.loadPackageDefinition(packageDefinition).greeting;


function hello (req, res) {
        try {
                var client = new greeting_proto.GreetingService('0.0.0.0' + ':50051',
                    grpc.credentials.createInsecure());
                return new Promise((resolve, reject) => {
                        client.hello({
                                name: req.params.name
                            },
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
        }
}

function helloClientSide (req, res) {
        try {
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
        }
}

function helloServerSide (req, res) {
        try {
                var client = new greeting_proto.GreetingService('0.0.0.0' + ':50051',
                    grpc.credentials.createInsecure());
                return new Promise((resolve, reject) => {
                        let call = client.helloServerSide();
                        call.on('data', function(feature) {
                                console.log(feature);
                                res.send(feature.message)
                        });
                        call.on('end', function() {
                                return res.send('Finalizo la comunicacion');
                        });
                });
        } catch (e) {
                console.error(e);
        }
}

function helloBidirectional (req, res) {
        try {
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
        }
}

module.exports = {
        hello,
        helloClientSide,
        helloServerSide,
        helloBidirectional
};