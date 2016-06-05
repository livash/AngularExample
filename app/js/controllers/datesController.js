'use strict';

squidApp.controller('datesController',
    function starWarsController($scope) {
        $scope.description = 'Example of using filters for formatting dates.';
        $scope.dates = [
            '2016-04-22T22:44:27Z',
            '2016-04-21T22:44:27Z',
            '2016-04-01T22:44:27Z',
            '2015-04-22T22:44:27Z'
        ];
});
