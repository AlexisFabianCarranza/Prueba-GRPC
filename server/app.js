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

function main() {
    var server = new grpc.Server();
    server.addService(greeting_proto.GreetingService.service, {
        hello: greeting
    });
    server.bind( '0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    server.start();
}

async function greeting(call, callback) {
    var request = call.request;
    callback(null,
        {
            message: 'Hola querido ' + request.name
        })
}

main();