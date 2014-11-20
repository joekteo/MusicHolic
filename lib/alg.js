/*jshint node:true*/
'use strict';

var drinksSelector = require('./drinks_list.js');

var score = function(num) {

  var drinkName = '';

  var chooseRandom = function(array) {
    return Math.floor(Math.random() * array.length);
  };

  if (num > 2.5) {
    drinkName = drinksSelector.highest[chooseRandom(drinksSelector.highest)];
  } else if (num >= 2 && num < 2.5) {
    drinkName = drinksSelector.higher[chooseRandom(drinksSelector.higher)];
  } else if (num >= 1.5 && num < 2) {
    drinkName = drinksSelector.higher[chooseRandom(drinksSelector.high)];
  } else if (num >= 1.0 && num < 1.5) {
    drinkName = drinksSelector.higher[chooseRandom(drinksSelector.mid)];
  } else if (num >= 0.5 && num < 1.0) {
    drinkName = drinksSelector.higher[chooseRandom(drinksSelector.low)];
  } else if (num >= 0 && num < 0.5) {
    drinkName = drinksSelector.higher[chooseRandom(drinksSelector.lowest)];
  }

  var url = 'http://musicholic/herokuapp.com/public/images/' +
  drinkName +
  '.jpg';

  return {
    name: drinkName,
    imageUrl: url
  };
};

module.exports = score;
