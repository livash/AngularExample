squidApp.directive('personCard', () => {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/templates/directives/personCard.html',
        scope: {
            person: '='
        }
    };
});