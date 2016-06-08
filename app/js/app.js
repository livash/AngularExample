'use strict';

var squidApp = angular.module('squidApp', ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider.when('/starwars',
            {
                templateUrl: 'templates/StarWarsData.html',
                controller: 'starWarsController'
            }
        );
        $routeProvider.when('/colors',
            {
                templateUrl: 'templates/Colors.html',
                controller: 'colorsController'
            }
        );
        $routeProvider.when('/capitals',
            {
                templateUrl: 'templates/Capitals.html',
                controller: 'capitalsController'
            }
        );
        $routeProvider.when('/dates',
            {
                templateUrl: 'templates/Dates.html',
                controller: 'datesController'
            }
        );
        $routeProvider.when('/d3',
            {
                templateUrl: 'templates/d3Examples.html',
                controller: 'd3ExamplesController'
            }
        );
        
        $routeProvider.when('/d3maps',
            {
              templateUrl: 'templates/d3Maps.html',
              controller: 'd3MapsController'
            }
        );
        $routeProvider.otherwise({redirectTo: '/d3'});
});
