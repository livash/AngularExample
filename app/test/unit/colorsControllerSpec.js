describe('colorsController', function(){
  var $controllerConstructor, scope;

  beforeEach(module('squidApp'));

  beforeEach(inject(function($controller, $rootScope) {
    $controllerConstructor = $controller;
    scope = $rootScope.$new();
  }));

  it('should set the scope.colors to an array of 17 elements', function() {
    var ctrl = $controllerConstructor('colorsController', {$scope: scope});
    expect(scope.colors).toEqual(jasmine.any(Array));
    expect(scope.colors.length).toEqual(17);
  });

  it('should set the scope.description to a string', function() {
    var ctrl = $controllerConstructor('colorsController', {$scope: scope});
    expect(scope.description).toEqual(jasmine.any(String));
  });

  it('should set the scope.removeButtontext and scope.shuffleButtonText', function() {
    var ctrl = $controllerConstructor('colorsController', {$scope: scope});
    expect(scope.shuffleButtonText).toEqual(jasmine.any(String));
    expect(scope.removeButtonText).toEqual(jasmine.any(String));
  });

  it('should ser the scope.showColorName, scope.removeColorNames, and scope.shuffleColors to be a function', function() {
    var ctrl = $controllerConstructor('colorsController', {$scope: scope});
    expect(scope.showColorName).toEqual(jasmine.any(Function));
    expect(scope.removeColorNames).toEqual(jasmine.any(Function));
    expect(scope.shuffleColors).toEqual(jasmine.any(Function));
  });
});