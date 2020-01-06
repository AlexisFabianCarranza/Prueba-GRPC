const PROTO_PATH = '../greeting.proto';
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const logger = require('simple-node-logger').createSimpleLogger();
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
    console.log('---------------------------------------------------------------------------------');
    logger.info('Comienza una comunicacion simple- Server');
    let request = call.request;
    callback(null,
        {
            message: 'Hola querido ' + request.name
        });
    logger.info('Finaliza una comunicacion simple- Server');
}

function helloServerSide(call, callback) {
    console.log('---------------------------------------------------------------------------------');
    logger.info('Comienza el streaming del lado del servidor - Servidor');
    eteam.forEach(person => {
            call.write( {
                message: 'Hola querido ' + person + ' / Server Side Streaming'
            });
        }
    );
    call.end();
    logger.info('Finaliza el streaming del lado del servidor - Cliente');
}

function helloBidirectional(call, callback) {
    console.log('---------------------------------------------------------------------------------');
    logger.info('Comienza el streaming bidireccional - Servidor');
    call.on('data', function(message) {
        logger.info('Mensaje obtenido - ' + message.name);
        call.write({
            message: 'Hola querido ' + message.name
        })
    });
    call.on('end', function() {
        logger.info('Finaliza el streaming bidireccional - Servidor');
        call.end();
    });
}

function helloClientSide(call, callback) {
    console.log('---------------------------------------------------------------------------------');
    logger.info('Comienza el streaming del lado del cliente - Servidor');
    call.on('data', function(feature) {
        logger.info(feature);
    });
    call.on('end', function() {
        logger.info('Finaliza el streaming del lado del cliente - Servidor');
    });
}

main();