'use strict'
const express = require('express')
const server = express()
const bodyParser = require('body-parser');
const Message = require('./models/message')
const port =  process.env.PORT || 8080


server.get('/messages', function(req, res) {
    Message.find(function(err, messages) {
        if (err) {
            console.log("Error: ", err)
        }
        res.json(messages)
    })
})

server.post('/messages', function(req, res) {
	console.log(req.get)
    var message = new Message({
        message : req.body.message
    })
    message.save(function(err, message) {
        if (err) {
            console.log("Error: ", err)
        }
        res.json(200, message)
    })
})

server.listen(port, function () {
    console.log("Server ",  process.pid, 'listening on ', port )
});
console.log("Server listening to port 8080")

exports = module.exports = server