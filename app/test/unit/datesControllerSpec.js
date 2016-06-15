describe('datesController', function(){
  var $controllerConstructor, scope

  beforeEach(module('squidApp'));

  beforeEach(inject(function($controller, $rootScope) {
    $controllerConstructor = $controller;
    scope = $rootScope.$new();
  }));

  it('should set the scope.dates to an array of four dates', function() {
    var ctrl = $controllerConstructor('datesController', {$scope: scope});
    expect(scope.dates.length).toEqual(4);
  });

  it('should set the scope.description to a string', function() {
    var ctrl = $controllerConstructor('datesController', {$scope: scope});
    expect(scope.description).toEqual(jasmine.any(String));
  });
});