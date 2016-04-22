'use strict';

squidApp.controller('starWarsController',
    function starWarsController($scope, starWarsDataService) {
        $scope.people;
        $scope.status;
        $scope.description = 'Data from STAR WARS API https://swapi.co/'

        getPeople();

        function getPeople() {
            starWarsDataService.getAllPeople()
                .then(function (response) {
                    $scope.people = response.data.results;
                }, function (error) {
                    $scope.status = 'Unable to retreive data';
            });
        }
});
