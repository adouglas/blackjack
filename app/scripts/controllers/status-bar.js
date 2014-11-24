'use strict';

/**
 * @ngdoc function
 * @name blackjackApp.controller:StatusBarCtrl
 * @description
 * # StatusBarCtrl
 * Controller of the blackjackApp
 */
angular.module('blackjackApp')
  .controller('StatusBarCtrl', function ($scope,$rootScope,$timeout,game,dealer) {
    $scope.information = 'Player 1 Turn: Stay or Hit?';
    $scope.buttonsDisabled = false;

    $scope.stay = function(){
      $scope.buttonsDisabled = true;
      dealer.playerStays();
      $rootScope.$broadcast('update_table');
    };

    $scope.hit = function(){
      $scope.buttonsDisabled = true;
      dealer.playerHits();
      if(dealer.evaluatePlayer() > 21){
        $scope.information = 'BUST!'
        $timeout(function() {
          dealer.nextSeat();
          $rootScope.$broadcast('update_table');
        }, 1500);
      }
      else{
        $scope.information = 'Score now: ' + dealer.evaluatePlayer();
        $timeout(function() {
          $rootScope.$broadcast('update_table');
        }, 1500);
      }
    };

    var init = function () {
      $rootScope.$on('update_table',function(){
        if(game.getPlayerAtSeat(dealer.currentSeatNum()).playerName == 'Dealer'){
          $scope.information = game.getPlayerAtSeat(dealer.currentSeatNum()).playerName + ' Turn';
          dealer.playDealer();
          $rootScope.$broadcast('close_table');
          return;
        }

        $scope.information = game.getPlayerAtSeat(dealer.currentSeatNum()).playerName + ' Turn: Stay or Hit?';
        $scope.buttonsDisabled = false;
      });
    };
    init();
  });
