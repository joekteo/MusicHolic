/*jshint node:true*/
'use strict';

var drinksSelector = require('./drinks_list.js');

var score = function(num) {

  var drinkName = '';
  
  var chooseRandom = function(array) {
    return Math.floor(Math.random() * array.length);
  };
  
  //the simple algorithm that determines which drink from which category will be selected!
  //the drink is picked from a specific array based on where the numerical value of the song is placed.
  if (num > 2.3) {
    drinkName = drinksSelector.highest[chooseRandom(drinksSelector.highest)];
  } else if (num >= 1.8 && num < 2.3) {
    drinkName = drinksSelector.higher[chooseRandom(drinksSelector.higher)];
  } else if (num >= 1.4 && num < 1.8) {
    drinkName = drinksSelector.high[chooseRandom(drinksSelector.high)];
  } else if (num >= 1.0 && num < 1.4) {
    drinkName = drinksSelector.mid[chooseRandom(drinksSelector.mid)];
  } else if (num >= 0.5 && num < 1.0) {
    drinkName = drinksSelector.low[chooseRandom(drinksSelector.low)];
  } else if (num >= 0 && num < 0.5) {
    drinkName = drinksSelector.lowest[chooseRandom(drinksSelector.lowest)];
  }
  
  //the url used to obtain the respective image of a specific drink
  var url = 'http://musicholic.herokuapp.com/images/' +
  drinkName +
  '.jpg';
  
  //data returned will be in JSON format
  return {
    name: drinkName,
    imageUrl: url
  };
};

module.exports = score;
