/*jshint node:true*/
'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var moment = require('moment');

var userSchema = mongoose.Schema({
  basic: {
    email: 'String',
    password: 'String'
  }
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.basic.password);
};

userSchema.methods.generateToken = function(secret) {
  var expires = moment().add(7, 'days').valueOf();
  var self = this;
  var token = jwt.encode({
    iss: self._id,
    expire: expires,
    admin: (function() {
      if (self.basic.email === 'admin@example.com')
        return true;
      else
        return false;
    }())
  }, secret);
  return token;
};

module.exports = mongoose.model('User', userSchema);
