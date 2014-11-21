/*jshint node:true*/
'use strict';

process.env.MONGO_URL = 'mongodb://localhost/users_test';
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);

require('../server');

var expect = chai.expect;

describe('back-end tests', function() {
  var email = 'test@example.com';

  it('should be unable to create user if pw fails', function(done) {
    chai.request('http://localhost:3000') //change this for each one or die
    .post('/api/users')
    .send({
      email: email,
      password: 'foobar54',
      passwordConfirm: 'foobar'
    })
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.text).to.be.eql('cannot create that user');
      done();
    });
  });

  it('should be able to email login + send another token back', function(done) {
    chai.request('http://localhost:3000')
    .get('/api/users')
    .auth(email, 'foobar123')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('jwt');
      done();
    });
  });

  it('should be unable to create an existing user', function(done) {
    chai.request('http://localhost:3000')
    .post('/api/users')
    .send({
      email: email,
      password: 'foobar123',
      passwordConfirm: 'foobar123'
    })
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.text).to.be.eql('cannot create that user');
      done();
    });
  });
});
