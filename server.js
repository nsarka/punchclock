const passport = require('passport')
const mongoose = require('mongoose')
const express = require('express')
  , http = require('http');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.use('/', express.static('dist'))






server.listen(8080);