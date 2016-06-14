describe('colorsController', function(){
  var $controllerConstructor, scope

  beforeEach(module('squidApp'));

  beforeEach(inject(function($controller, $rootScope) {
    $controllerConstructor = $controller;
    scope = $rootScope.$new();
  }))

  it('should set the scope.colors to an array of 17 elements', function() {
    var ctrl = $controllerConstructor('colorsController', {$scope: scope});
    expect(scope.colors).toEqual(jasmine.any(Array));
    expect(scope.colors.length).toEqual(17);
  });
});