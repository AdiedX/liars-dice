'use strict';

/*
 * Autoseeded ARC4-based PRNG.  Reasonably unpredictable
 */
const seedRandom = require('seedrandom');
const randomGenerator = seedRandom();

const Player = function () {
  this._diceValues = [];
};

Player.prototype.rollDice = function () {
  var noOfDice = 5;
  for ( var i = 0; i < noOfDice; i++ ) {
    this._diceValues.push(Math.ceil(randomGenerator() * 5));
  }
};

module.exports = Player;
