const express = require('express');
const app = express();
const {hello, helloClientSide, helloServerSide, helloBidirectional} = require('./http-client');

const PORT = 5000;

async function getHello(name) {
    let response = await hello(name);
    return ;
}

app.listen(PORT, function () {
    console.log('Example app listening on port ' + PORT);
    getHello("pepe");
});