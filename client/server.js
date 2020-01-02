var express = require('express');
var app = express();

var grpcClient = require('./grpc-client');


app.get('/', function (req, res) {
    res.json(grpcClient.greeting())
});

app.listen(3001, function () {
    console.log('Example app listening on port 3000!');
});