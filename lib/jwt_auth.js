/*jshint node:true*/
'use strict';

var User = require('../models/user');
var jwt = require('jwt-simple');

module.exports = function(secret) {
  return function(req, res, next) {
    var token = req.headers.jwt || req.body.jwt;

    var decoded;
    try {
      decoded = jwt.decode(token, secret);
    } catch (err) {
      console.log(err);
      return res.status(403).send('Access denied');
    }

    User.findOne({_id: decoded.iss}, function(err, user) {
      if (err) return res.status(403).send('Access denied');
      if (!user) return res.status(403).send('Access denied');
      //expired token rejector
      if (decoded.expire <= Date.now()) {
        return res.status(400).send('Token has expired');
      }
      //verifies user is admin
      if (decoded.admin) {
        console.log('Admin verified');
      }

      console.log(decoded.admin);

      req.user = user;
      next();
    });
  };
};
