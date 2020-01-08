const express = require('express');
const app = express();
//client.js
var io = require('socket.io-client');
var socket = io.connect('http://localhost:3000', {reconnect: true});
const eteam = ['Leo', 'Rodri', 'Fran', 'Damian', 'Mati', 'Alex'];
const logger = require('simple-node-logger').createSimpleLogger();


// Add a connect listener
socket.on('connect', function (socket) {
    logger.info('Conexion de cliente (envia)');
});
eteam.forEach(person => {
    let start =new Date();
        socket.emit('persona', person,start);
    }
);

socket.on('persona', function (person,start) {

    let end = new Date();
    let startDate = new Date(start);
    let diff = end - startDate;
    let message = 'Hola querido '  + person;
    logger.info(message + "- " + diff);
});