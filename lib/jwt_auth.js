/*jshint node:true*/
'use strict';

var jwt = require('jwt-simple');
var User = require('../models/user');

module.exports = function(secret) {
  return function(req, res, next) {
    var token = req.headers.jwt || req.body.jwt;

    var decoded;
    try {
      decoded = jwt.decode(token, secret);
    } catch (err) {
      console.log(err);
      res.status(403).send(err);
    }

    var oneSec = 1000;
    var oneMin = oneSec * 60;
    var oneHr = oneMin * 60;
    var oneDay = oneHr * 24;

    if ((Date.now() - decoded.exp) > oneDay)
      return res.status(403).send('session is expired');

    User.findOne({_id: decoded.iss}, function(err, user) {
      if (err) return res.status(403).send('access denied');
      if (!user) return res.status(403).send('access denied');

      req.user = user;
      next();
    });
  };
};
