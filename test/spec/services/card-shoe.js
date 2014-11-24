'use strict';

describe('Service: cardShoe', function () {

  // load the service's module
  beforeEach(module('blackjackApp'));

  // instantiate service
  var cardShoe;
  beforeEach(inject(function (_cardShoe_) {
    cardShoe = _cardShoe_;
    cardShoe.prepareShoe();
  }));

  it('should contain 52 cards', function () {
    expect(cardShoe.countCards()).toBe(52);
  });
  it('should deal a single card and leave 51 cards in the deck', function () {
    cardShoe.drawCard();
    expect(cardShoe.countCards()).toBe(51);
  });
  it('should contain a full set of cards', function () {
    // TODO (loop over a full deck)
    expect(true).toBe(true);
  });
  it('should contain no duplicate cards', function () {
    // TODO (loop over a full deck and test uniqueness of each card)
    expect(true).toBe(true);
  });
});
