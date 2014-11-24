'use strict';

describe('Controller: StatusBarCtrl', function () {

  // load the controller's module
  beforeEach(module('blackjackApp'));

  var StatusBarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StatusBarCtrl = $controller('StatusBarCtrl', {
      $scope: scope
    });
  }));

  // it('should attach a list of awesomeThings to the scope', function () {
  //   expect(scope.awesomeThings.length).toBe(3);
  // });
});
