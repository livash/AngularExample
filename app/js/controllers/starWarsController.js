'use strict';

console.log({KKK: squidApp});

squidApp.controller('starWarsController',
    function starWarsController($scope, starWarsDataService) {
		$scope.people;
		$scope.status;
		
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