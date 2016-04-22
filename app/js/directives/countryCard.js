'use strict';

console.log('Locaded CountryCard.js');

eventsApp.directive('countryCard', function() {
    return {
        restrict: 'C',
        templateUrl: '/templates/directives/countryCard.html',
        scope: {
            country: "="
        }
    } 
});