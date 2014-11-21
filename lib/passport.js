/*jshint node:true*/
'use strict';

var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/user');

module.exports = function(passport) {
  passport.use('basic', new BasicStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    User.findOne({'basic.email':email}, function(err, user) {
      if (err) {
        console.log('cannot login error:', err);
        return done('server error');
      }
      if (!user) {
        console.log('user find login error:', err);
        return done('access error');
      }
      if (!user.validPassword(password)) {
        console.log('password login error:', err);
        return done('access error');
      }
      return done(null, user);
    });
  }));
};
