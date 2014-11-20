/*jshint node: true*/
'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var request = require('superagent');
var app = express();
var uri = 'mongodb://simonkim:12qwaszx@ds053080.mongolab.com:53080/musicholic';
var score = require('./lib/alg');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect(uri);

app.get('/api/song', function(req, res) {
  var url = 'http://developer.echonest.com/api/v4/song/profile?api_key=' +
  'PGTZEGJKHLCVM1ADB&id=SONWCPE12B3A138A4E&bucket=audio_summary&format=json';

  request
    .get(url)
    .end(function(err, data) {
      var parsedData = data.body;

      console.log(parsedData);
      var danceability = parsedFloat(parsedData.response.songs[0].audio_summary.danceability);
      var valence = parsedFloat(parsedData.response.songs[0].audio_summary.valence);
      var energy = parsedFloat(parsedData.response.songs[0].audio_summary.energy);

      var songScore = (danceability + energy + valence) / 3;
      score(songScore);

      res.send(score);
    });
});

require('./routes/songs_routes')(app);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server started on port: %d', port);
});
