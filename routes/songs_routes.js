'use strict';
var Song = require('../models/song');
var score = require('../lib/alg');
var request = require('superagent');

module.exports = function(app) {

  app.get('/api/song', function(req, res) {
    Song.find({}, function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });

  app.post('/api/song', function(req, res) {
    var song = new Song(req.body);
    song.save(function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });

  app.get('/api', function(req, res) {
    var url = 'http://musicholic.herokuapp.com/api/song';

    request
    .get(url)
    .end(function(err, data) {
      var parsedData = data.body;

      var danceability = parsedData.response.songs[0].audio_summary.
      danceability;
      var valence = parsedData.response.songs[0].audio_summary.valence;
      var energy = parsedData.response.songs[0].audio_summary.energy;

      var songScore = (danceability + energy + valence) / 3;
      score(songScore);

      res.json(score(songScore));
    });
  });
};
