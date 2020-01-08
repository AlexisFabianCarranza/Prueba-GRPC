var express = require('express')
var http = require('http')
var app = express()

app.get('/hello', (req, res) => {

    let message = 'Hola querido ' + req.query.name

    res.status(200).send(message)
})

http.createServer(app).listen(5001, () => {
    console.log('Server started at http://localhost:5001');
});