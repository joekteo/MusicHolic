'use strict';
var Song = require('../models/song');
var request = require('superagent');

module.exports = function(app) {
  
  app.get('/api/song', function(req, res) {
    Song.find({}, function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });

  app.post('/api/song', function(req, res) {
    var note = new Song(req.body);
    note.save(function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });

  app.post('/api', function(req, res) {
    var url = 'http://musicholic.herokuapp.com/api/song';

    request
    .get(url)
    .end(function(err, data) {
      var parsedData = JSON.parse(data.text);

      var danceability = parsedData.bucket.audio_summary.danceability;
      var valence = parsedData.bucket.audio_summary.valence;
      var energy = parsedData.bucket.audio_summary.energy;

      var highest = [
      'Jager Bombs',
      'Jello Shots',
      'Jack&Coke',
      'Lemon Drop',
      'Tequila Shots',
      'Champagne',
      'AMF',
      'Kamikaze',
      'BEER!'
      ];

      var higher = [
      'AMF',
      'BEER!',
      'Shots!',
      'Negroni',
      'Daiquiri',
      'Sex on the Beach',
      'Midori Sour',
      'Mint Julep',
      'BEER!'
      ];

      var high = [
      'Margarita',
      'Caipirinha',
      'Mai-Tai',
      'Mojito',
      'Long Island Iced Tea',
      'Bloody Mary',
      'Tequila Sunrise',
      'Pina Colada',
      'BEER!'
      ];

      var mid = [
      'Appletini',
      'Screwdriver',
      'White Russian',
      'Manhattan',
      'Cosmopolitan',
      'Mimosa',
      'BEER!'
      ];

      var low = [
      'Gin and Tonic',
      'Irish Coffee',
      'Old Fashioned',
      'Gin Martini',
      'BEER!'
      ];

      var lowest = [
      'Whiskey(neat)',
      'Wine',
      'Sake',
      'BEER!'
      ];

      var songScore = (danceability + energy + valence) / 3;

      function drink() {
        if (songScore > 2.5) {
        console.log(highest[Math.floor(Math.random() * highest.length)]);
        } else if (songScore >= 2 && songScore < 2.5) {
        console.log(higher[Math.floor(Math.random() * higher.length)]);
        } else if (songScore >= 1.5 && songScore < 2) {
        console.log(high[Math.floor(Math.random() * high.length)]);
        } else if (songScore >= 1.0 && songScore < 1.5) {
        console.log(mid[Math.floor(Math.random() * mid.length)]);
        } else if (songScore >= 0.5 && songScore < 1.0) {
        console.log(low[Math.floor(Math.random() * low.length)]);
        } else if (songScore >= 0 && songScore < 0.5) {
        console.log(lowest[Math.floor(Math.random() * lowest.length)]);
        }
      }

      res.send(drink);
    });
  });
};
