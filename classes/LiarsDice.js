'use strict';

var Player = require('./Player');

var LiarsDice = function ( noOfPlayers ) {
	this._playerCount = noOfPlayers;
	this._players = [];
	this._moves = [];
	this._currentValCount = 0;
	this._claims = [];
};

LiarsDice.prototype = {

	init: function () {
		for ( var i = 0; i < this._playerCount; i++ ) {
			this._players[i] = new Player();
			this._players[i].rollDice();
			this._logMessage('Dice values for player ' + (i + 1) + ':', this._players[i]._diceValues);
		}
	},

	getPlayerDiceValues: function ( playerNo ) {
		return this._players[playerNo]['_diceValues'];
	},

	getPlayerValueCount: function ( playerNo, playerDiceVal ) {
		var c = 0;
		this._players[playerNo]['_diceValues'].forEach(function (val) {
			if ( val == playerDiceVal ) {
				c++;
			}
		});
		return c;
	},

	getValueCount: function ( diceValue ) {
		var c = 0;
		this._players.forEach(function ( player ) {
			player['_diceValues'].forEach(function ( val ) {
				if ( val == diceValue ) {
					c++;
				}
			});
		});
		return c;
	},

	/*
	 * @method move - Initiates a player's move, keeps track of dice value count, logs information about player and dice values
	 * 	@param {Number} player - player number (ex: 1, 2, 3, 4)
	 * 	@param {Number} diceCount - count of the specified dice value the player has
	 * 	@param {Number} value - player's dice value displayed publicly
	 */
	move: function ( player, diceCount, value ) {
		if( this._currentValCount + diceCount <= this.getPlayerValueCount( player - 1, value ) ) {
			this._currentValCount += diceCount;
		} else {
			throw 'dice count cannot exceed players value count';
		}

		this._trackMoves({ player: player - 1, diceCount: diceCount, value: value });

		var message = 'Player ' + player + ' put ' + diceCount + ' ' + value + '\'s on the table';
		this._logMessage(message);
	},


	/*
	 * @method claim - Makes a claim and logs whether it is probable based on calculated probability
	 * 	@param {Number} diceCount - Count of the dice value
	 * 	@param {Number} value - Dice value
	 */
	claim: function ( diceCount, value ) {
		var cumulativeProbability, k, n;

		this._trackClaims({ diceCount: diceCount, value: value });

		k = ( diceCount - this._currentValCount );
		n = ( 20 - this._currentValCount );

		cumulativeProbability = this._calculateCumulativeProbability( k, n );

		this._logMessage('Claim: There are ' + diceCount + ' ' + value + '\'s among all players!');
		this._logMessage('Probability of claim: ', (cumulativeProbability * 100).toFixed(2) + '%');
		this._analyzeCumulativeProbability(cumulativeProbability);
	},

	/*
	 * @method challenge - Verify if the last claim is true or false
	 */
	challenge: function () {
		var
			claim = this._claims.pop(),
			diceCount = claim.diceCount,
			value = claim.value,
			diceValues = [],
			p = this._playerCount,
			c;

		for ( var i = 0; i < p; i++ ) {
			diceValues.push(this.getPlayerDiceValues(i));
		}

		c = this._calculateTotalDiceCount( diceValues, value );

		/* For testing purposes */
		this._diceValues = diceValues;
		this._diceCount = diceCount;

		this._logMessage('The claim is ' + ( c == diceCount ));
	},

	/* Private methods: */
	_analyzeCumulativeProbability: function( cumulativeProbability ) {
		if ( cumulativeProbability > 0.9 ) {
			this._logMessage('It is very likely to be true!');
		} else if ( cumulativeProbability > 0.5 ) {
			this._logMessage('It is a probable claim');
		} else if ( cumulativeProbability < 0.001 ) {
			this._logMessage('Ridiculous claim! There is now way that\'s true!');
		} else if ( cumulativeProbability < 0.1 ) {
			this._logMessage('It is very likely not a true claim');
		} else if ( cumulativeProbability < 0.5 ) {
			this._logMessage('It is not a probable claim');
		}
	},

	_logMessage: function( message, value ) {
		if(value == undefined) {
			console.log(message);
		} else {
			console.log(message, value);
		}
	},

	_trackClaims: function(claim) {
		this._claims.push(claim);
	},

	_trackMoves: function(move) {
		this._moves.push(move);
	},

	_calculateTotalDiceCount: function( diceValueArray, value ) {
		var c = 0;
		diceValueArray.forEach(function( player ) {
			player.forEach(function( val ) {
				if(val == value) {
					c++;
				}
			})
		});

		return c;
	},

	_factorial: function ( N ) {
		var result = 1;

		for ( var i = 2; i <= N; i++ ) {
			result *= i;
		}

		return result;
	},

	_noOfCombinations: function ( k, n ) {
		return this._factorial( n ) / (this._factorial( k ) * this._factorial( n - k ));
	},

	_probability: function ( k, n ) {
		return this._noOfCombinations( k, n ) * Math.pow( 1/ 6, k ) * Math.pow( 5/6, n - k );
	},

	_calculateCumulativeProbability: function( k, n ) {
		var cumulativeProbability = 0;

		for ( var i = k; i <= n ; i++ ) {
			cumulativeProbability += this._probability( i, n );
		}

		return cumulativeProbability;
	}

};

module.exports = LiarsDice;
