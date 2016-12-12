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
			console.log('dice values', this._players[i]._diceValues);
		}
	},

	getPlayerDiceValues: function ( playerNo ) {
		return this._players[playerNo]['_diceValues'];
	},

	getPlayerValueCount: function ( playerNo, playerDiceVal ) {
		var c = 0;
		this._players[playerNo]['_diceValues'].forEach(function (val) {
			if ( val == playerDiceVal ) { c++; }
		});
		return c;
	},

	getValueCount: function ( diceValue ) {
		var c = 0;
		this._players.forEach(function ( player ) {
			player['_diceValues'].forEach(function ( val ) {
				if ( val == diceValue ) { c++; }
			});
		});
		return c;
	},

	move: function ( player, diceCount, value ) {
		if( this._currentValCount + diceCount <= this.getPlayerValueCount(player, value) ) {
			this._currentValCount += diceCount;
		} else {
			throw 'dice count cannot exceed players value count';
		}

		this._moves.push( { player: player, diceCount: diceCount, value: value } );
	},

	/* Make a claim and return whether it is probable  */
	claim: function ( diceCount, value ) {
		var cumulativeProbability = 0, k, n;

		this._claims.push( { diceCount: diceCount, value: value } );

		k = ( diceCount - this._currentValCount );
		n = ( 20 - this._currentValCount );

		for ( var i = k; i <= n ; i++ ) {
			cumulativeProbability += this._probability( i, n );
		}

		console.log('cumulativeProbability', cumulativeProbability);

		if ( cumulativeProbability > 0.9 ) {
			return 'It is very likely to be true!';
		} else if ( cumulativeProbability > 0.5 ) {
			return 'It is a probable claim';
		} else if ( cumulativeProbability < 0.001 ) {
			return 'Ridiculous claim! There is now way that\'s true!';
		} else if ( cumulativeProbability < 0.1 ) {
			return 'It is very likely not a true claim';
		} else if ( cumulativeProbability < 0.5 ) {
			return 'It is not a probable claim';
		}

	},

	/* Verify the validity of the last claim */
	challenge: function () {
		var claim = this._claims.pop(),
				diceCount = claim.diceCount,
				value = claim.value,
				diceValues = [],
				p = this._playerCount,
				c = 0;

		for ( var i = 0; i < p; i++ ) {
			diceValues.push(this.getPlayerDiceValues(i));
		}

		diceValues.forEach(function( player ) {
			player.forEach(function( val ) {
				if(val == value) {
					c++;
				}
			})
		});

		return 'The claim is ' + ( c == diceCount );
	},

	_probability: function ( k, n ) {
		return this._noOfCombinations( k, n ) * Math.pow( 1/ 6, k ) * Math.pow( 5/6, n - k );
	},

	_noOfCombinations: function ( k, n ) {
		return this._factorial( n ) / (this._factorial( k ) * this._factorial( n - k ));
	},

	_factorial: function ( N ) {
		var result = 1;

		for ( var i = 2; i <= N; i++ ) {
			result *= i;
		}

		return result;
	}

};

module.exports = LiarsDice;
