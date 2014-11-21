'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DataSchema = new Schema({
  echoData: {
    artist_id: String,
    artist_name: String,
    id: String,
    title: String
  }
});

module.exports = mongoose.model('Data', DataSchema);
