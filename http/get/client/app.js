const express = require('express');
const app = express();
const {hello, helloClientSide, helloServerSide, helloBidirectional} = require('./http-client');

const PORT = 5000;

async function getHello(name) {
    let response = await hello(name);
    return ;
}/*
app.get('/serverSideStreamingRPC/', async function (req, res) {
    let response = await helloServerSide(req, res);
    return response;
});

app.get('/clientSideStreamingRPC/:name', async function (req, res) {
    let response = await helloClientSide(req);
    return res.send(response);
});

app.get('/bidirectionalStreamingRPC/:name', async function (req, res) {
    let response = await helloBidirectional(req);
    return res.send(response);
});*/

app.listen(PORT, function () {
    console.log('Example app listening on port ' + PORT);
    getHello("pepe");
});