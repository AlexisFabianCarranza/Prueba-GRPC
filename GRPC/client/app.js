const express = require('express');
const app = express();
const { hello, helloClientSide, helloServerSide, helloBidirectional } = require('./grpc-client');

const PORT = 3001;


app.get('/simpleRPC/:name', async function (req, res) {
    let response = await hello(req, res);
    return res.send(response);
});

app.get('/serverSideStreamingRPC/', async function (req, res) {
    let response = await helloServerSide(req, res);
    return response;
});

app.get('/clientSideStreamingRPC/', async function (req, res) {
    let response = await helloClientSide(req, res);
    return res.send(response);
});

app.get('/bidirectionalStreamingRPC/', async function (req, res) {
    let response = await helloBidirectional(req, res);
    return res.send(response);
});

app.listen(PORT, function () {
    console.log('Example app listening on port ' + PORT);
});