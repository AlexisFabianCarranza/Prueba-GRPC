var express = require('express');
var app = express();

var grpcClient = require('./grpc-client');


app.get('/:name', async function (req, res) {
    let response = await grpcClient.greeting(req);
    return res.send(response);
});

app.listen(3001, function () {
    console.log('Example app listening on port 3000!');
});