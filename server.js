/*jshint node: true*/
'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var request = require('superagent');
var passport = require('passport');
var app = express();
var uri = 'mongodb://simonkim:12qwaszx@ds053080.mongolab.com:53080/musicholic';

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect(uri);

app.set('jwtSecret', process.env.JWT_SECRET || 'changethisordie');

app.use(passport.initialize());
require('./lib/passport')(passport);
var jwtauth = require('./lib/jwt_auth')(app.get('jwtSecret'));

var userRouter = express.Router();
userRouter.use(jwtauth);

require('./routes/user_routes')(app, passport);

app.get('/data', function(req, res) {
  var url = 'http://musicholic.herokuapp.com/api';

  request
    .get(url)
    .end(function(err, songData) {
      var parsedData = songData.body;

      res.json(parsedData);
    });
});

require('./routes/songs_routes')(app);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server started on port: %d', port);
});
