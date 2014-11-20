/*jshint node:true*/
'use strict';

var drinksSelector = require('./drinks_list.js');

var score = function(songScore) {

  var drinkName = '';
  var url = 'http://musicholic/herokuapp.com/public/images/' +
  drinkName +
  '.jpg';
  var chooseRandom = function(array){
    return Math.floor(Math.random() * array.length);
  };

  if (songScore > 2.5) {
    drinkName = drinksSelector.highest[chooseRandom(drinksSelector.highest)];
  } else if (songScore >= 2 && songScore < 2.5) {
    drinkName = drinksSelector.higher[chooseRandom(drinksSelector.higher)];
  } else if (songScore >= 1.5 && songScore < 2) {
    drinkName = drinksSelector.higher[chooseRandom(drinksSelector.high)];
  } else if (songScore >= 1.0 && songScore < 1.5) {
    drinkName = drinksSelector.higher[chooseRandom(drinksSelector.mid)];
  } else if (songScore >= 0.5 && songScore < 1.0) {
    drinkName = drinksSelector.higher[chooseRandom(drinksSelector.low)];
  } else if (songScore >= 0 && songScore < 0.5) {
    drinkName = drinksSelector.higher[chooseRandom(drinksSelector.lowest)];
  }
  return {
  name: drinkName,
  imageUrl: url
  };
};

module.exports = score;
