'use strict';

var LiarsDice = require('../classes/LiarsDice');
var seedRandom = require('seedrandom');
var randomGenerator = seedRandom();

describe('Liars Dice', function() {
	var game, randomIndex, playerDiceVal, playerValueCount;

	var init = function() {
		game = new LiarsDice(4);
		game.init();
		randomIndex = Math.floor(randomGenerator() * 5);
		playerDiceVal = game.getPlayerDiceValues(1)[randomIndex];
		playerValueCount = game.getPlayerValueCount(1, playerDiceVal);
	};

	init();

	it('should generate random, numeric, dice values for players', function() {
		var players = game._players;
		var flag = true;

		if(Array.prototype.isPrototypeOf(players)) {
			players.forEach(function(player) {
				player['_diceValues'].forEach(function(val) {
					if ( !(typeof val == 'number') ) {
						flag = false;
					}
				});
			});
		} else {
			flag = false;
		}

		expect(flag).toBe(true);
	});

	it('should have a move() method which keeps track of all moves, current dice value-count, and logs a message', function() {
		expect(game._currentValCount).toBe(0);
		expect(game._moves.length).toBe(0);
		spyOn(game, '_logMessage');
		game.move(1, 1, playerDiceVal);
		expect(game._currentValCount).not.toBe(0);
		expect(game._moves.length).toBe(1);
		expect(game._logMessage).toHaveBeenCalled();
	});

	it('should have a claim() method which calculates probability and logs to the user a statement', function() {
		spyOn(game, '_trackClaims');
		spyOn(game, '_logMessage');
		spyOn(game, '_calculateCumulativeProbability');
		spyOn(game, '_analyzeCumulativeProbability');
		game.claim(3, playerDiceVal);
		expect(game._calculateCumulativeProbability).toHaveBeenCalled();
		expect(game._analyzeCumulativeProbability).toHaveBeenCalled();
		expect(game._logMessage).toHaveBeenCalled();
		expect(game._trackClaims).toHaveBeenCalled();
	});

	xit('should have a challenge() method which verifies if the last claim is true', function() {
		spyOn(game, '_calculateTotalDiceCount');
		spyOn(game, '_logMessage');
		game.challenge();
		expect(game._calculateTotalDiceCount).toHaveBeenCalled();
		expect(game._logMessage).toHaveBeenCalled();
	});

});
