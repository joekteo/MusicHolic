'use strict';
var Song = require('../models/song');
var Data = require('../models/data');
var score = require('../lib/alg');
var request = require('superagent');

module.exports = function(app) {

  app.get('/data', function(req, res) {
    Data.find({}, function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });

  app.post('/data', function(req, res) {
    var dataS = new Data(req.body);
    dataS.save(function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });

  app.get('/data/song', function(req, res) {
    var url = 'http://musicholic.herokuapp.com/data';

    request
    .get(url)
    .end(function(err, songData) {
      var parsedData = songData.body;
      var key = process.env.ECHO_KEY || 'PGTZEGJKHLCVM1ADB';

      var songID = parsedData.response.songs[0].id;
      var newUrl = 'http://developer.echonest.com/api/v4/song/profile?' +
      'api_key=' +
      key +
      '&id=' +
      songID +
      '&bucket=audio_summary&format=json';

      res.json(newUrl);
    });
  });

  app.get('/data/song/info', function(req, res) {
    var url = 'http://musicholic.herokuapp.com/data/song';

    request
    .get(url)
    .end(function(err, urlData) {
      var parsedData = urlData.body;

      res.redirect(parsedData);
    });
  });

  app.get('/data/song/info', function(req, res) {
    Song.find({}, function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });

  app.post('/data/song/info', function(req, res) {
    var song = new Song(req.body);
    song.save(function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });

  app.get('/out', function(req, res) {
    var url = 'http://musicholic.herokuapp.com/data/song/info';

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
