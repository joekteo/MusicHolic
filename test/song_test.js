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
  it('should be able to send json', function(done) {
    chai.request(server).
    post('/api').
    send({
      url:'http://developer.echonest.com/api/v4/song/search?' +
      'api_key=' +
      'PGTZEGJKHLCVM1ADB&artist=the%20used&title=empty%20with%20you'
      //Echo Nest limits accesses to 2 songs per minute.
      //Test will return 'Cannot read property '0' of undefined' if over limit
      //Comment out line 23 and uncomment line 27 if limit is over
      //'PGTZEGJKHLCVM1ADB&artist=kanye%20west&title=all%20of%20the%20lights'
    }).
    end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('name');
      expect(res.body).to.have.property('imageUrl');
      done();
    });
  });
});
