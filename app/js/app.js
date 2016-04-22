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
        $routeProvider.when('/sampleDirective', 
            {
                templateUrl: 'templates/SampleDirective.html',
                controller: 'SampleDirectiveController'
            }
        );
        $routeProvider.otherwise({redirectTo: '/colors'})
    });