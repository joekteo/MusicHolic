'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UrlSchema = new Schema({
  info: {
    url: String
  }
});

module.exports = mongoose.model('Url', UrlSchema);
