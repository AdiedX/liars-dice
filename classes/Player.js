'use strict';

var Player = function () {
	this._diceValues = [];
};

Player.prototype.rollDice = function () {
	var noOfDice = 5;
	for ( var i = 0; i < noOfDice; i++ ) {
		this._diceValues.push(Math.ceil(Math.random() * 5));
	}
};

module.exports = Player;
