'use strict';

/**
 * @ngdoc service
 * @name blackjackApp.game
 * @description
 * # game
 * Service in the blackjackApp.
 * A single backjack game service. This service provides access to individual players (seated at the table)
 * and initialises a new game.
 */
angular.module('blackjackApp')
  .service('game', function (cardShoe) {
    var seats = [];
    var dealer2ndCard = null;

    // Starts a new game
    this.newGame = function(numOfPlayers){
      // If no config is provided start with 8 players (and the dealer)
      if(!numOfPlayers){
        numOfPlayers = 8;
      }

      var i;

      // Initialise defaults
      seats = [];
      seats[numOfPlayers] = {
        playerName: 'Dealer',
        cards: []
      };
      for(i = 0; i < numOfPlayers;  i++){
        seats[i] = {
          playerName: 'Player ' + (i+1),
          cards: []
        };
      }

      // Shuffle a new deck
      cardShoe.prepareShoe();

      // Deal cards (2 to each seat including the dealers)
      for(i = 0; i < ((numOfPlayers+1) * 2)-1; i++){
        seats[i%(numOfPlayers+1)].cards.push(cardShoe.drawCard());
      }
      dealer2ndCard = cardShoe.drawCard();
    };

    // Returns the number of seats (players + dealer)
    this.getSeatCount = function(){
      return seats.length;
    };

    // Returns details of a player (or the dealer) at a given seat
    this.getPlayerAtSeat = function(seatNum){
      return seats[seatNum];
    };

    // Returns 2nd (facedown) dealer card
    this.getDealer2ndCard = function(){
      return dealer2ndCard;
    };
  });
