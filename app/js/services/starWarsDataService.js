'use strict';

squidApp.factory('starWarsDataService', ['$http', function($http) {
    var urlBase = 'http://swapi.co/api/';
    var starWarsDataService = {};

    starWarsDataService.getAllPeople = function () {
        return $http.get(urlBase + 'people?format=json');
    }

    return starWarsDataService;
}]);