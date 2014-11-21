/*jshint node: true*/
'use strict';
var Url = require('../models/url');
var score = require('../lib/alg');
var express = require('express');
var request = require('superagent');
var bodyParser = require('body-parser');
var async = require('async');
var app = express();

app.use(bodyParser.json());

module.exports = function(app) {

  app.get('/', function(req, res) {
    res.send('hello world');
  });

  app.get('/api', function(req, res) {
    Url.findOne({'info.url': req.body.url}, function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.send({url: data.info.url});
    });
  });

  app.post('/api', function(req, res) {
    var songId;

    async.series([

      function(callback) {
        request(req.body.url)
          .end(function(req, sData) {
            var parsedData = JSON.parse(sData.text);
            songId = parsedData.response.songs[0].id;
          });
        callback(null, 'one');
      },

      function(callback) {
        var key = process.env.ECHO_KEY || 'PGTZEGJKHLCVM1ADB';
        var newUrl = 'http://developer.echonest.com/api/v4/song/profile?' +
        'api_key=' +
        key +
        '&id=' +
        songId +
        '&bucket=audio_summary&format=json';

        request(newUrl)
          .end(function(req, echoData) {
            var parsedData = JSON.parse(echoData.text);
            var danceability = parsedData.response.songs[0].audio_summary.
            danceability;
            var valence = parsedData.response.songs[0].audio_summary.valence;
            var energy = parsedData.response.songs[0].audio_summary.energy;
            var songScore = (danceability + energy + valence);

            score(songScore);
            res.json(score(songScore));
          });
        callback(null, 'two');
      }
    ],

      function(err, results) {
        return results;
      });
  });
};