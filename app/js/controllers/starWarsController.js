squidApp.controller('starWarsController',
  function starWarsController($scope, starWarsDataService) {
    $scope.description = 'Data from STAR WARS API https://swapi.co/';
    
    let success = (response) => $scope.people = response.data.results;
    let failure = (error) => $scope.status = 'Unable to retreive data';
    let getPeople = () => starWarsDataService.getAllPeople().then(success, failure);

    getPeople();
});
