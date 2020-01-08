const express = require('express');
const app = express();
const { hello, helloClientSide, helloServerSide, helloBidirectional } = require('./grpc-client');

const PORT = 3001;

app.get('/simpleRPC/:name', async function (req, res) {
    await hello(req.params.name);
    return res.send('See the console');
});

app.get('/serverSideStreamingRPC/', async function (req, res) {
    await helloServerSide();
    return res.send('See the console');
});

app.get('/clientSideStreamingRPC/', async function (req, res) {
    await helloClientSide();
    return res.send('See the console');
});

app.get('/bidirectionalStreamingRPC/', async function (req, res) {
    await helloBidirectional();
    return res.send('See the console');
});

app.listen(PORT, async function () {
    console.log('Example app listening on port ' + PORT);
    await helloBidirectional();
    await hello('PEPE el peposo');
    await helloServerSide();
    await helloClientSide();
});