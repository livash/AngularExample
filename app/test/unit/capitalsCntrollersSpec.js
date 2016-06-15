describe('capitalsController', function(){
  var $controllerConstructor, scope;

  beforeEach(module('squidApp'));

  beforeEach(inject(function($controller, $rootScope) {
    $controllerConstructor = $controller;
    scope = $rootScope.$new();
  }));

  it('should set the scope.countries to an array for four countries', function() {
    var ctrl = $controllerConstructor('capitalsController', {$scope: scope});
    expect(scope.countries.length).toEqual(4);
  });

  it ('should set the scope.showCapitals to a function', function() {
    var ctrl = $controllerConstructor('capitalsController', {$scope: scope});
    expect(typeof scope.showCapital).toBe('function');
  });

  it('should set the scope.description to a string', function() {
    var ctrl = $controllerConstructor('capitalsController', {$scope: scope});
    expect(scope.description).toEqual(jasmine.any(String));
  });
});