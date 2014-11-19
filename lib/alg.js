/*jshint node:true*/
'use strict';

var drinksSelector = require('./drinks_list.js');
var drinks = require('./drinks_list.js');

var songScore = (danceability + energy + valence) / 3;
var drinkName = '';

var chooseRandom = function(array){
  return Math.floor(Math.random() * array.length);
};

exports.song = function(songScore) {
  if (songScore > 2.5) {
    // console.log(drinksSelector.highest[Math.floor(Math.random() * drinksSelector.highest.length)]);
    drinkName = drinksSelector.highest[chooseRandom(drinksSelector.highest)];
  } else if (songScore >= 2 && songScore < 2.5) {
    // console.log(drinksSelector.higher[Math.floor(Math.random() * drinksSelector.higher.length)]);
    drinkName = drinksSelector.higher[chooseRandom(drinksSelector.higher)];
  } else if (songScore >= 1.5 && songScore < 2) {
    // console.log(drinksSelector.high[Math.floor(Math.random() * drinksSelector.high.length)]);
    drinkName = drinksSelector.higher[chooseRandom(drinksSelector.high)];
  } else if (songScore >= 1.0 && songScore < 1.5) {
    // console.log(drinksSelector.mid[Math.floor(Math.random() * drinksSelector.mid.length)]);
    drinkName = drinksSelector.higher[chooseRandom(drinksSelector.mid)];
  } else if (songScore >= 0.5 && songScore < 1.0) {
    // console.log(drinksSelector.low[Math.floor(Math.random() * drinksSelector.low.length)]);
    drinkName = drinksSelector.higher[chooseRandom(drinksSelector.low)];
  } else if (songScore >= 0 && songScore < 0.5) {
    // console.log(drinksSelector.lowest[Math.floor(Math.random() * drinksSelector.lowest.length)]);
    drinkName = drinksSelector.higher[chooseRandom(drinksSelector.lowest)];
  }
  return (songScore);
};

var url = drinks[drinkName];

return {
  name: drinkName,
  imageUrl: url
};
