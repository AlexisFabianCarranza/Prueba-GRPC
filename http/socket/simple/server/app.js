var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const logger = require('simple-node-logger').createSimpleLogger();

io.on('connection', function (socket) {
    logger.info('Conexion de servidor (escucha)');

    socket.on('persona', function (person, start) {

        let end = new Date();
        let startDate = new Date(start);
        let diff = end - startDate;
        let message = 'Hola querido '  + person;
        logger.info(message + "- " + diff);
    });

});

http.listen(3000, function () {
    logger.info('listening on *:3000');
})

