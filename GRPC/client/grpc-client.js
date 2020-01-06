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


function hello (req, res) {
        try {
                logger.info('Comienza una comunicacion simple- Cliente');
                const client = new greeting_proto.GreetingService('0.0.0.0' + ':50051',
                    grpc.credentials.createInsecure());
                return new Promise((resolve, reject) => {
                        client.hello({
                                name: req.params.name
                            },
                            (error, response) => {
                                    if (error) {
                                            return reject(error);
                                    }
                                    logger.info('Finaliza una comunicacion simple- Cliente');
                                    return resolve(response);
                            });
                });
        } catch (e) {
                console.error(e);
        }
}

function helloClientSide (req, res) {
        try {
                console.log('---------------------------------------------------------------------------------');
                logger.info('Comienza el streaming del lado del cliente - Cliente');
                const client = new greeting_proto.GreetingService('0.0.0.0' + ':50051',
                    grpc.credentials.createInsecure());
                let call = client.helloClientSide(function(error) {
                        if (error) {
                                callback(error);
                        }
                });
                eteam.forEach(person => {
                            call.write({
                                    name: person
                            })
                    }
                );
                call.end();
                logger.info('Finzaliza el streaming del lado del cliente - Cliente');
                return 'Finalizo la comunicacion GRPC de streaming del lado de cliente - Puede ver el flujo de mensajes en la consola';
        } catch (e) {
                console.error(e);
        }
}

function helloServerSide (req, res) {
        try {
                console.log('---------------------------------------------------------------------------------');
                logger.info('Comienza el streaming del lado del servidor - Cliente');
                let cont = 0;
                const client = new greeting_proto.GreetingService('0.0.0.0' + ':50051',
                    grpc.credentials.createInsecure());
                return new Promise(async (resolve, reject) => {
                        let call = client.helloServerSide({});
                        call.on('data', function(feature) {
                                logger.info(feature);
                                cont += 1;
                                res.write(  '\n' + cont + '. ' +  feature.message);
                        });
                        call.on('end', function() {
                                logger.info('Finaliza el streaming del lado del servidor - Cliente');
                                cont = 0;
                                res.end();
                        });
                });
        } catch (e) {
                console.error(e);
        }
}

function helloBidirectional (req, res) {
        try {
                console.log('---------------------------------------------------------------------------------');
                logger.info('Comienza el streaming bidireccional - Cliente');
                const client = new greeting_proto.GreetingService('0.0.0.0' + ':50051',
                    grpc.credentials.createInsecure());
                let call = client.helloBidirectional(function(error) {
                        if (error) {
                                callback(error);
                        }
                });
                let cont = 0;
                eteam.forEach(person => {
                            call.write({
                                    name: person
                            })
                    }
                );
                call.on('data', function(feature) {
                        logger.info(feature);
                        cont += 1;
                        if ( cont === eteam.length) call.end(); //Condicion de corte para el streaming
                });
                call.on('end', function() {
                        logger.info('Finaliza el streaming del lado del servidor - Cliente');
                        cont = 0;
                        call.end();

                });
                if ( cont === 0 ) return 'Finalizo la comunicacion GRPC bidireccional - Puede ver el flujo de mensajes en la consola';
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