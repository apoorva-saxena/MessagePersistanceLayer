'use strict'
const express = require('express');
const server = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
let allMessages = {};  // In memory storage.
let messageIdSeed = 0;  // simple seeding of first id.  

server.use(function(req, res, next) {
  const contentType = req.headers['content-type'] || '';
  const mime = contentType.split(';')[0];

  if (mime != 'text/plain') {
    return next();
  }

  var data = '';
  req.setEncoding('utf8');
  req.on('data', function(chunk) {
    data += chunk;
  });
  req.on('end', function() {
    req.rawBody = data;
    next();
  });
});

server.get('/messages/:id', function(req, res) {
  const messageId = req.params.id;
  if (messageId in allMessages) {
    res.send(allMessages[messageId]);
  } else {
    res.sendStatus(404)
  }
});

function getUniqueId() {
  messageIdSeed += 1;
  return messageIdSeed;
}

server.post('/messages/', function(req, res) {
  const message = req.rawBody;
  const messageId = getUniqueId();
  allMessages[messageId] = message;
  res.json({id: messageId});
});

server.listen(port, function() {
    console.log("Server ", process.pid, 'listening on ', port)
});
console.log("Server listening to port 8080");

exports = module.exports = server;