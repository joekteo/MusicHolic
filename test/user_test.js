/*jshint node: true*/
'use strict';

process.env.MONGO_URL = 'mongodb://localhost/3000';
// var User = require('../models/user.js');
// var Song = require('../models/song.js');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);

require('../server');

var expect = chai.expect;

describe('users tests', function() {
  var jwt;
  var loginJSON = {
    screenName: 'test_user123',
    email: 'test_user123@example.com',
    password: '12345678'
  };
  var loginJSONbad = {
    screenName: 'test_user123',
    email: 'test_user123@example.com',
    password: '123'
  };
  it('should be able to create a new user', function(done) {
    chai.request('http://localhost:3000')
    .post('/api/user')
    .send(loginJSON)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('jwt');
      jwt = res.body.jwt;
      expect(jwt).to.be.a('string');
      done();
    });
  });
  it('should refuse to create a new user with short password', function(done) {
    chai.request('http://localhost:3000')
    .post('/api/user')
    .send(loginJSONbad)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.statusCode).to.eql(400);
      done();
    });
  });
  it('should be able to get a token for an existing user', function(done) {
    chai.request('http://localhost:3000')
    .get('/api/user')
    .auth(loginJSON.email, loginJSON.password)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('jwt');
      jwt = res.body.jwt;
      expect(jwt).to.be.a('string');
      done();
    });
  });
});
