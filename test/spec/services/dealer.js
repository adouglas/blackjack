'use strict';

describe('Service: dealer', function() {

  // load the service's module
  beforeEach(module('blackjackApp'));

  // instantiate service
  var dealer;
  var game;
  beforeEach(inject(function(_dealer_, _game_) {
    dealer = _dealer_;
    game = _game_;
    dealer.startGame();
  }));

  it('should start with Player 1', function() {
    expect(game.getPlayerAtSeat(dealer.currentSeatNum()).playerName).toBe('Player 1');
  });

  // This test does rather too much and incudes some trivial tests but is
  // here to show how a game might work
  it('should be able to play a valid game of blackjack', function() {
    var player;
    var playerTotal;
    for (var i = 0; i < game.getSeatCount() - 1; i++) {
      player = game.getPlayerAtSeat(dealer.currentSeatNum());
      playerTotal = dealer.evaluatePlayer();
      console.log(player.playerName + ' has ' + playerTotal);
      while (dealer.evaluatePlayer() < Math.floor(Math.random() * (8 + 1) + 11)) {
        dealer.playerHits();
        playerTotal = dealer.evaluatePlayer();
        console.log(player.playerName + ' hits (' + playerTotal + ')');
      }
      dealer.playerStays();
    }

    // Dealer plays last
    var dealerSeat = game.getPlayerAtSeat(dealer.currentSeatNum());
    expect(dealerSeat.playerName).toBe('Dealer');
    dealer.playDealer();
    var dealerTotal = dealer.evaluatePlayer();

    // How has the dealer done?
    console.log('Dealer ' + (dealerTotal > 21 ? 'Busts' : 'has ' + dealerTotal))

    // Start back at the first player
    dealer.nextSeat();

    // Evaluate how each player has done individualy and in regards to the dealer
    for (var i = 0; i < game.getSeatCount() - 1; i++) {
      player = game.getPlayerAtSeat(dealer.currentSeatNum());
      playerTotal = dealer.evaluatePlayer();

      console.log(player.playerName + (playerTotal > 21 ? ' BUSTS' : ' has ' + playerTotal))
      if (playerTotal <= 21) {
        if (playerTotal == dealerTotal) {
          console.log('DRAW');
          expect(playerTotal).toBe(dealerTota);
        } else if (dealerTotal <= 21 && playerTotal < dealerTotal) {
          console.log('Dealer beats ' + player.playerName + ' [LOSS]');
          expect(dealerTotal <= 21).toBe(true);
          expect(playerTotal < dealerTotal).toBe(true);
        } else {
          console.log(player.playerName + ' WINS');
        }
      }
      dealer.nextSeat();
    }

  });

});
