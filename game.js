'use strict';
/* Let's play the game! */

var LiarsDice = require('./classes/LiarsDice');

/* Initialize the game */
var game = new LiarsDice(4);
game.init();

/* Get player dice info */
var randomIndex = Math.floor(Math.random() * 5);
var playerDiceVal = game.getPlayerDiceValues(1)[randomIndex];
var playerValueCount = game.getPlayerValueCount(1, playerDiceVal);

console.log('playerDiceVal', playerDiceVal);
console.log('playerValueCount', playerValueCount);

game.move(1, 1, playerDiceVal);
console.log();
console.log(game.claim(3, playerDiceVal));
console.log();
console.log(game.challenge());
