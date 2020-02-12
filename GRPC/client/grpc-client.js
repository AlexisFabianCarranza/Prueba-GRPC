const PROTO_PATH = '../greeting.proto';
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const logger = require('simple-node-logger').createSimpleLogger();
const eteam = ['Leo' , 'Rodri', 'Fran', 'Damian', 'Mati', 'Alex'];

const IP_HOST = process.env.IP_HOST || 'grpc-server';

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


function hello (name) {
        try {
                logger.info('---------------------------------------------------------------------------------');
                logger.info('Simple gRPC - Start - Client');
                const client = new greeting_proto.GreetingService(IP_HOST + ':50051',
                    grpc.credentials.createInsecure());
                return new Promise((resolve, reject) => {
                        client.hello({
                                name,
                                timeStart: Date.now()
                        }, (error, response) => {
                                if (error) {
                                        logger.error(error);
                                }
                                let responseTime = Date.now() - Number(response.timeStart);
                                logger.info('\tReception Time: ' + responseTime + ' ml - Message: '+ JSON.stringify(response));
                                logger.info('Simple gRPC - End - Client');
                                resolve()
                        });
                })

        } catch (e) {
                console.error(e);
        }
}

function helloClientSide () {
        try {
                logger.info('---------------------------------------------------------------------------------');
                logger.info('Client Side Streaming gRPC - Start - Client');
                const client = new greeting_proto.GreetingService(IP_HOST + ':50051',
                    grpc.credentials.createInsecure());
                return new Promise((resolve, reject) => {
                        let call = client.helloClientSide(function(error) {
                                if (error) {
                                        reject(error);
                                }
                        });
                        eteam.forEach(person => {
                                call.write({
                                        name: person,
                                        timeStart: Date.now()
                                });
                        });
                        call.end();
                        logger.info('Client Side Streaming gRPC - End - Client');
                        resolve()
                });
        } catch (e) {
                console.error(e);
        }
}

function helloServerSide () {
        try {
                logger.info('---------------------------------------------------------------------------------');
                logger.info('Server Side Streaming gRPC - Start - Client');
                const client = new greeting_proto.GreetingService(IP_HOST + ':50051',
                    grpc.credentials.createInsecure());
                return new Promise((resolve, reject) => {
                        let call = client.helloServerSide({});
                        call.on('data', function(feature) {
                                let responseTime = Date.now() - Number(feature.timeStart);
                                logger.info('\tReception Time: ' + responseTime + ' ml - Message: '+ JSON.stringify(feature));
                        });
                        call.on('end', () =>  {
                                logger.info('Server Side Streaming gRPC - End - Client');
                                resolve();
                        });
                });
        } catch (e) {
                console.error(e);
        }
}

function helloBidirectional () {
        try {
                logger.info('---------------------------------------------------------------------------------');
                logger.info('Bidirectional Streaming - Start - Client');
                const client = new greeting_proto.GreetingService(IP_HOST + ':50051',
                    grpc.credentials.createInsecure());
                return new Promise((resolve, reject) => {
                        let cont = 0;
                        let call = client.helloBidirectional(function(error) {
                                if (error) {
                                        logger.error(error);
                                }
                        });
                        eteam.forEach(person => {
                                call.write({
                                        name: person,
                                        timeStart: Date.now()
                                })
                        });
                        call.on('data', function(feature) {
                                let responseTime = Date.now() - Number(feature.timeStart);
                                logger.info('\tReception Time: ' + responseTime + ' ml - Message: '+ JSON.stringify(feature));
                                cont += 1;
                                if ( cont === eteam.length) call.end(); //Condicion de corte para el streaming
                        });
                        call.on('end', function() {
                                logger.info('Bidirectional Streaming - End - Client');
                                cont = 0;
                                call.end();
                                resolve()
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