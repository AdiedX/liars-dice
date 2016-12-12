'use strict';

var LiarsDice = require('../classes/LiarsDice');

describe('Liars Dice', function() {
	var game, randomIndex, playerDiceVal, playerValueCount;
	beforeEach(function() {
		game = new LiarsDice(4);
		game.init();
		randomIndex = Math.floor(Math.random() * 5);
		playerDiceVal = game.getPlayerDiceValues(1)[randomIndex];
		playerValueCount = game.getPlayerValueCount(1, playerDiceVal);

		spyOn(console, 'log');
	});

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

	it('should have a move() method which initiates a move, keeps track of all moves, and logs to the console', function() {
		expect(game._currentValCount).toBe(0);
		expect(game._moves.length).toBe(0);

		game.move(1, 1, playerDiceVal);

		expect(game._currentValCount).not.toBe(0);
		expect(game._moves.length).toBe(1);

		expect(console.log).toHaveBeenCalled();
	});

	it('should have a claim() method which calculates probability and logs to the user a statement', function() {
		expect(game._claims.length).toBe(0);

		spyOn(game, '_probability');
		game.claim(3, playerDiceVal);

		expect(game._probability).toHaveBeenCalled();
		expect(game._claims.length).toBe(1);
		expect(console.log).toHaveBeenCalled();
	});

	xit('should have a challenge() method which verifies if the last claim is true', function() {
		game.challenge();

		var c = 0;
		game._diceValues.forEach(function(playerValues) {
			c += playerValues.length;
		});

		expect(game._diceCount).toBe(c);
	});

});
