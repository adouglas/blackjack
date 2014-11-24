'use strict';

describe('Service: game', function () {

  // load the service's module
  beforeEach(module('blackjackApp'));

  // instantiate service
  var game;
  beforeEach(inject(function (_game_) {
    game = _game_;
    game.newGame();
  }));

  it('should by default have 9 players (inc the dealer)', function () {
    expect(game.getSeatCount()).toBe(9);
  });

  it('should deal 2 cards to all seats', function () {
    for(var i = 0; i < game.getSeatCount(); i++){
      expect(game.getPlayerAtSeat(i).cards.length).toBe(2);
    }
  });
});
