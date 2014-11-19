/*jshint node:true*/
'use strict';

var drinkSelector = {
  highest: [
    'AMF',
    'Beer',
    'Champagne',
    'Jack and Coke',
    'Jager Bombs',
    'Jello Shots',
    'Kamikaze',
    'Lemon Drop',
    'Tequila Shots'
  ],
  higher: [
    'AMF',
    'Beer',
    'Daiquiri',
    'Midori Sour',
    'Mint Julep',
    'Negroni',
    'Sex on the Beach',
    'Shots'
  ],
  high: [
    'BloodyMary',
    'Beer',
    'Caipirinha',
    'Long Island Iced Tea',
    'Mai-Tai',
    'Margarita',
    'Mojito',
    'Pina Colada',
    'Tequila Sunrise'
  ],
  mid: [
    'Appletini',
    'Beer',
    'Cosmopolitan',
    'Manhattan',
    'Mimosa',
    'Screwdriver',
    'White Russian'
  ],
  low: [
    'Beer',
    'Gin and Tonic',
    'Gin Martini',
    'Irish Coffee',
    'Old Fashioned'
  ],
  lowest: [
    'Beer',
    'Whiskey(neat)',
    'Sake',
    'Wine'
  ]
};

var drinks = {
  AMF: '',
  Appletini:'',
  Beer:'',
  BloodyMary:'',
  Caipirinha:'',
  Champagne:'',
  Cosmopolitan:'',
  Daiquiri:'',
  'Gin and Tonic':'',
  'Gin Martini':'',
  'Irish Coffee':'',
  'Jack and Coke':'',
  'Jager Bombs':'',
  'Jello Shots':'',
  Kamikaze:'',
  'Lemon Drop':'',
  'Long Island Iced Tea':'',
  'Tequila Shots':'',
  'Tequila Sunrise':'',
  'Mai-Tai':'',
  Manhattan:'',
  Margarita:'',
  'Midori Sour':'',
  Mimosa:'',
  'Mint Julep':'',
  Mojito:'',
  Negroni:'',
  'Old Fashioned':'',
  'Pina Colada':'',
  Sake:'http://upload.wikimedia.org/wikipedia/commons/b/b8/Unfiltered_Sake_at_Gyu-Kaku.jpg',
  Screwdriver:'',
  'Sex on the Beach':'',
  Shots:'',
  'Whiskey(neat)':'',
  'White Russian':'',
  Wine:''
};

module.exports = drinkSelector;
module.exports = drinks;
