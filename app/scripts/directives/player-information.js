'use strict';

/**
 * @ngdoc directive
 * @name blackjackApp.directive:playerInformation
 * @description
 * # playerInformation
 */
angular.module('blackjackApp')
  .directive('playerInformation', function () {
    function playerInformationController($scope,$rootScope,dealer,game){
      $scope.bust = false;
      $scope.win = false;
      $scope.lose = false;
      $scope.draw = false;
      $scope.active = false;

      $scope.$watch('player.cards.length',function(a,b){
        if(a !== b){
          $scope.total = dealer.evaluatePlayer($scope.player);
          if($scope.total > 21){
            $scope.bust = true;
          }
        }
      });

      $rootScope.$on('update_table',function(){
        // Hacky way to do this but fine for now
        if(game.getPlayerAtSeat(dealer.currentSeatNum()).playerName == $scope.player.playerName){
          $scope.active = true;
        }
        else{
          $scope.active = false;
        }
      });

      $rootScope.$on('close_table',function(){
        if($scope.player.playerName == 'Dealer') return;

        if(!$scope.bust){
          $scope.total = dealer.evaluatePlayer($scope.player);
          var dealerTotal = dealer.getDealerScore();
          if ($scope.total == dealerTotal) {
            $scope.draw = true;
          } else if (dealerTotal <= 21 && $scope.total < dealerTotal) {
            $scope.lose = true;
          } else {
            $scope.win = true;
          }
        }
      });

      $scope.total = dealer.evaluatePlayer($scope.player);
      if(game.getPlayerAtSeat(dealer.currentSeatNum()).playerName == $scope.player.playerName){
        $scope.active = true;
      }
      else{
        $scope.active = false;
      }
    }
    return {
      templateUrl: '/views/directives/player-information.html',
      restrict: 'E',
      controller: playerInformationController,
      scope: {
        player: '='
      }
    };
  });
