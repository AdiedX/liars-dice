# liars-dice
### Docs
```javascript
  Class LiarsDice

    move( playerNo, diceCount, value )
      Initiates a move
      Keeps track of the value count
      Logs information about player
      Value and number of dice
      Keeps track of the moves in a stack

    claim( diceCount, value )
      Takes in dice count and value to calculate the probability that k of the n total dice values are the specified dice value
      Logs the above-calculated probability
      Return a comment on the likelihood of the claim

    challenge()
      Verifies if the last made claim is actually true
      Returns a statement explicitly saying if the claim is true or false
      Takes no parameters and obtains the necessary dice count and value from the data stored in a stack internally
 ```
 
### To be able to run the tests, install ```jasmine-node``` globally & run the npm script
   ```npm i -g jasmine-node```<br>
   ```npm run jasmine-node```
