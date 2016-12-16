# liars-dice
```
  @class LiarsDice
     @method move - Initiates a player's move, keeps track of dice value count, logs information about player and dice values
      @param {Number} player - player number (ex: 1, 2, 3, 4)
      @param {Number} diceCount - count of the specified dice value the player has
      @param {Number} value - player's dice value displayed publicly

     @method claim - Makes a claim and logs whether it is probable based on calculated probability
      @param {Number} diceCount - Count of the dice value
      @param {Number} value - Dice value

    @method challenge - Verify if the last claim is true or false and log it to the players
 ```
### Play the game
```
node game.js
```
### To be able to run the tests, install ```jasmine-node``` globally & run the npm script
```
npm i -g jasmine-node
```
```
npm install
npm run jasmine-node
```
