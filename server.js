/*jshint node: true*/
'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var app = express();
var uri = 'mongodb://heroku_app31805474:egoif5c19eqoet166fceq6o28i@' +
'ds051970.mongolab.com:51970/heroku_app31805474';

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

require('./routes/songs_routes')(app);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server started on port: %d', port);
});
