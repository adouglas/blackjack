'use strict';

/**
 * @ngdoc service
 * @name blackjackApp.dealer
 * @description
 * # dealer
 * Service in the blackjackApp.
 * A singleton dealer service. Each app has a single dealer responsible for actioning plays and
 * calculating outcomes
 */
angular.module('blackjackApp')
  .service('dealer', function (game,cardShoe) {
    var activeSeat = 0;
    var self = this;

    // Starts a new game (with a new deck)
    this.startGame = function(){
      game.newGame();
      activeSeat = 0;
    };

    // Returns the number (position) of the seat at the table currently being addressed by
    // the dealer
    this.currentSeatNum = function(){
      return activeSeat;
    };

    // Moves the dealers focus to the the next seat (conceptualy to the left)
    this.nextSeat = function(){
      if(++activeSeat >= game.getSeatCount()){
        activeSeat = 0;
      }
      return activeSeat;
    };

    // Player chooses to stay
    this.playerStays = function(){
      self.nextSeat();
    };

    // Player chooses to hit, dealer draws the player a new card
    this.playerHits = function(){
      // Get the current player (we could do this when changing the active seat, but we will do it here)
      var player = game.getPlayerAtSeat(activeSeat);
      // Push the player the next card from the shoe
      player.cards.push(cardShoe.drawCard());
    };

    // Evaluate the players current total
    this.evaluatePlayer = function(){
      // Get the current player (we could do this when changing the active seat, but we will do it here)
      var player = game.getPlayerAtSeat(activeSeat);
      var total = 0;
      var aceCount = 0;
      var tmp;

      // Sum up card values
      for(var i = 0; i < player.cards.length; i++){
        tmp = player.cards[i].value;
        total += tmp;
        if(tmp === 11){
          aceCount++;
        }
      }

      // Handle aces (1 or 11)
      while(aceCount > 0 && total > 21){
          total -= 10;
          aceCount--;
      }

      return total;
    };

    // Auto play the dealer
    this.playDealer = function(){
      activeSeat = game.getSeatCount()-1;

      // Dirty expensive way to play as the dealer but simple
      while(self.evaluatePlayer() < 16){
        self.playerHits();
      }

    };
  });
