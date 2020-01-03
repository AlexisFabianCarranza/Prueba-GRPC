const PROTO_PATH = '../greeting.proto';
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const eteam = ['Leo' , 'Rodri', 'Fran', 'Damian', 'Mati', 'Alex'];
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
);

const greeting_proto = grpc.loadPackageDefinition(packageDefinition).greeting;

function main() {
    let server = new grpc.Server();
    server.addService(greeting_proto.GreetingService.service, {
        hello,
        helloServerSide,
        helloBidirectional,
        helloClientSide
    });
    server.bind( '0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    server.start();
}

function hello(call, callback) {
    let request = call.request;
    callback(null,
        {
            message: 'Hola querido ' + request.name
        })
}

function helloServerSide(call, callback) {
    eteam.forEach(person => {
            setTimeout(() => {
                call.write( {
                    message: 'Hola querido ' + person + ' / Server Side Streaming'
                });
            }, 2000);
        }
    );
    call.end();
}

function helloBidirectional(call, callback) {
    call.on('data', function(message) {
        console.log('Mensaje recibido por el cliente: ' + message);
        eteam.forEach(person => {
                setTimeout(() => {
                    call.write( {
                        message: 'Hola querido ' + person + ' / Bidirectional Streaming'
                    });
                }, 2000);
            }
        );
    });
    call.on('end', function() {
        call.end();
    });
}

function helloClientSide(call, callback) {
    call.on('data', function(message) {
        console.log('Mensaje recibido por el cliente: ' + message);
    });
    call.on('end', function() {
        call.end();
    });
}

main();