/*jshint node: true*/
'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var request = require('superagent');
var app = express();

app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.urlencoded({extended: true}));

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server started on port %d', port);
});
