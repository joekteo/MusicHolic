/*jshint node:true*/
'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  basic: {
    screenname: 'String',
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
  var _this = this;
  var token = jwt.encode({
  iss: _this._id,
  //set expiration date
  exp: Date.now()
}, secret);
  return token;
};

module.exports = mongoose.model('User', userSchema);
