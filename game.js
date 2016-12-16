'use strict';
/* Let's play the game! */

var LiarsDice = require('./classes/LiarsDice');
var seedRandom = require('seedrandom');
var randomGenerator = seedRandom();

/* Initialize the game */
var game = new LiarsDice(4);
game.init();

/* Get player dice info */
var randomIndex = Math.floor(randomGenerator() * 5);
var playerDiceVal = game.getPlayerDiceValues(0)[randomIndex];
var playerValueCount = game.getPlayerValueCount(0, playerDiceVal);

/* Log the players' dice info */
console.log();
console.log('Current player\'s dice value: ', playerDiceVal);
console.log('Current dice value\'s count: ', playerValueCount);
console.log();
console.log('===============');
console.log('The game begins:');
console.log('===============');
console.log();

game.move(1, 1, playerDiceVal);
console.log();
game.claim(5, playerDiceVal);
console.log();
game.challenge();
