const express = require('express');
const app = express();
//client.js
var io = require('socket.io-client');
const IP_HOST = process.env.IP_HOST || '0.0.0.0';
var socket = io.connect('http://'+IP_HOST+':5002', {reconnect: true});
const eteam = ['Leo', 'Rodri', 'Fran', 'Damian', 'Mati', 'Alex'];
const logger = require('simple-node-logger').createSimpleLogger();


logger.info('http://'+IP_HOST + ':5002')

// Add a connect listener
socket.on('connect', function (socket) {
    logger.info('Conexion de cliente (envia) a '+'http://'+IP_HOST+':5002');
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