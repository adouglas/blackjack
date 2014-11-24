'use strict';
// Define a class to represent a playing card
function Card(suit, value, rank) {
  this.suit = suit; // Each card has a suit
  this.value = value; // and a value
  this.rank = rank; // and a rank
}

// These enumerated types define the suit, values and ranks
Card.Suit = {
  Clubs: 1,
  Diamonds: 2,
  Hearts: 3,
  Spades: 4
};
Card.Rank = {
  Two: 2,
  Three: 3,
  Four: 4,
  Five: 5,
  Six: 6,
  Seven: 7,
  Eight: 8,
  Nine: 9,
  Ten: 10,
  Jack: 11,
  Queen: 12,
  King: 13,
  Ace: 14
};
Card.Value = {
  Two: 2,
  Three: 3,
  Four: 4,
  Five: 5,
  Six: 6,
  Seven: 7,
  Eight: 8,
  Nine: 9,
  Ten: 10,
  Jack: 10,
  Queen: 10,
  King: 10,
  Ace: 11
};

// Define a textual representation for a card
Card.prototype.toString = function() {

  var s, r;
  switch (this.suit) {
    case 1:
      s = '♣';
      break;
    case 2:
      s = '♦';
      break;
    case 3:
      s = '♥';
      break;
    case 4:
      s = '♠';
      break;
  }
  switch (this.rank) {
    case 11:
      r = 'J';
      break;
    case 12:
      r = 'Q';
      break;
    case 13:
      r = 'K';
      break;
    case 14:
      r = 'A';
      break;
    default:
      r = this.rank;
      break;
  }
  return r+s;
};

// Compare the value of two cards
Card.prototype.compareTo = function(that) {
  if (this.value < that.value) {
    return -1;
  }
  if (this.value > that.value) {
    return 1;
  }
  return 0;
};

// A function for ordering cards
Card.orderByRank = function(a, b) {
  return a.compareTo(b);
};
