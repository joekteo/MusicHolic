/*jshint node: true*/
'use strict';

process.env.MONGO_URL = 'mongodb://localhost/3000';

var chai = require('chai');
var chaihttp = require('chai-http');
var server = 'http://localhost:' + (process.env.PORT || 3000);
var expect = chai.expect;

chai.use(chaihttp);
require('../server');

var expect = chai.expect;

describe('song test', function() {
  it('should be send req to echonest and return data to user', function(done) {
    this.timeout(10000);
    chai.request(server).
    post('/api').
    send({
      url:'http://developer.echonest.com/api/v4/song/search?' +
      'api_key=' +
      'PGTZEGJKHLCVM1ADB&artist=the%20used&title=empty%20with%20you'
    }).
    end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('name');
      expect(res.body).to.have.property('imageUrl');
      done();
    });
  });
});
