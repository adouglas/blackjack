/* global Card */
'use strict';

// Define a class to represent a standard deck of cards
function Deck() {
  var cards = this.cards = [];
  // Initialise the deck
  angular.forEach(Card.Suit,function(s) {
    angular.forEach(Card.Rank,function(r,n) {
      cards.push(new Card(s,Card.Value[n],r));
    });
  });
}

// Shuffle method: shuffles cards in place and returns the deck
Deck.prototype.shuffle = function() {
  // For each element in the array, swap with a randomly chosen lower element
  var deck = this.cards, len = deck.length;
  for(var i = len-1; i > 0; i--) {
    var r = Math.floor(Math.random()*(i+1));
    var temp = deck[i];
    deck[i] = deck[r];
    deck[r] = temp;
  }
  return this;
};

// Deal method: returns a single card or an array of cards
Deck.prototype.deal = function(n) {
  if (this.cards.length < n) {
    throw 'Out of cards';
  }
  return this.cards.splice(this.cards.length-n, n);
};

Deck.prototype.countCards = function() {
  return this.cards.length;
};
