'use strict';

var mongoose = require('mongoose');

var SongSchema = mongoose.Schema({
  echoData: {
    artist: String,
    title: String,
    md5: String,
    id: String,
    status: String,
    audio_summary: {
      danceability: Number,
      duration: Number,
      energy: Number,
      key: Number,
      loudness: Number,
      speechiness: Number,
      acousticness: Number,
      liveness: Number,
      tempo: Number
    }
  },
  userData: {
    speechiness: Number,
    acousticness: Number
  },
  filename: String,
  cached: Boolean
});

module.exports = exports = mongoose.model('Song', SongSchema);
