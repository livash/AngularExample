'use strict';

squidApp.directive('personCard', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/templates/directives/personCard.html',
        scope: {
            person: '=person'
        }
    } 
});