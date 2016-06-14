describe('starWarsController', function() {
  var $controllerConstructor, scope, mockDataService, q, 
  mockData = {
    results: {}
  };

  beforeEach(module('squidApp'));
  console.log('YYYYYYYYYY------YYYYYYY');
  console.log(sinon);

  beforeEach(inject(function($controller, $rootScope, $q) {
    $controllerConstructor = $controller;
    scope = $rootScope.$new();
    q = $q.defer();
    mockDataService = sinon.stub({getAllPeople: function() {}});
  }));
  
  it('should set scope.description to a string', function() {
    var ctrl = $controllerConstructor('starWarsController', {$scope: scope, starWarsDataService: mockDataService});
    console.log("HHHHHHHH+++++++++++++++++++++++++++++++");
    mockDataService.getAllPeople.returns(q.resolve(mockData));
    expect(scope.description).toEqual(jasmine.any(String)); 
  });
  
  // it('should set scope.description to a string', function() {
  //   var ctrl = $controllerConstructor('starWarsController', {$scope: scope, starWarsDataService: mockDataService});
  //   mockDataService.getAllPeople.returns({});
  //   
  // });
});