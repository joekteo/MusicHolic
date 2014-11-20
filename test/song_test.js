/*jshint node: true*/
'use strict';

process.env.MONGO_URL = 'mongodb://localhost/3000';
var User = require('../models/user.js');
var Song = require('../models/song.js');

var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);

require('./server');

var expect = chai.expect;

describe('song test', function() {

  it('should be able to get the song data', function(done) {

  });
  it('should be able match a song to the drink', function(done) {

  });
  it('should be able to generate a random song within the score list', function(done) {

  });
});