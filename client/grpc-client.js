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


exports.greeting = async function (req, res) {
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
};