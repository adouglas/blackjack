'use strict';

/**
 * @ngdoc service
 * @name blackjackApp.cardShoe
 * @description
 * # cardShoe
 * Service in the blackjackApp.
 * A single deck shoe service, providing a simple interface to produce access to a deck of shuffled cards.
 */
angular.module('blackjackApp')
  .service('cardShoe', function () {
      var deck = {};
      this.prepareShoe = function(){
        deck = (new Deck()).shuffle();
      };
      this.drawCard = function(n){
        if(!n){
          n = 1;
        }
        return n === 1 ? deck.deal(n)[0] : deck.deal(n);
      };
      this.countCards = function(){
        return deck.countCards();
      };
  });
