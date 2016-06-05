'use strict';

squidApp.directive('countryCard', function() {
    return {
        restrict: 'C',
        templateUrl: '/templates/directives/countryCard.html',
        scope: {
            country: "="
        }
    }; 
});