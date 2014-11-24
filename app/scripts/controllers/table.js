'use strict';

/**
 * @ngdoc function
 * @name blackjackApp.controller:TableCtrl
 * @description
 * # TableCtrl
 * Controller of the blackjackApp
 */
angular.module('blackjackApp')
  .controller('TableCtrl', function ($scope,game) {
    $scope.count = 0;
    $scope.Math = window.Math;

    $scope.range = function(min, max){
      var input = [];
      for (var i = min; i <= max; i++) input.push(i);
      return input;
    };

    var init = function () {
        game.newGame();
        $scope.seatCount = game.getSeatCount();
        $scope.game = game;
        $scope.count = 0;
    }
    init();
  });
