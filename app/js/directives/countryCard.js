squidApp.directive('countryCard', () => {
    return {
        restrict: 'C',
        templateUrl: '/templates/directives/countryCard.html',
        scope: {
            country: "="
        }
    }; 
});