/*jshint node:true*/
'use strict';

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
