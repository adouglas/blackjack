'use strict';

/**
 * @ngdoc directive
 * @name blackjackApp.directive:playerInformation
 * @description
 * # playerInformation
 */
angular.module('blackjackApp')
  .directive('playerInformation', function () {
    return {
      templateUrl: '/views/directives/player-information.html',
      restrict: 'E'
    };
  });
