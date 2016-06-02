'use strict';

squidApp.controller('d3ExamplesController',
    function capitalsController($scope) {
        $scope.d3Version = d3.version;
        $scope.data = [
          {month: 10, sales: 20},
          {month: 20, sales: 14},
          {month: 30, sales: 20},
          {month: 40, sales: 21},
          {month: 50, sales: 15},
          {month: 60, sales: 22},
          {month: 70, sales: 9},
          {month: 80, sales: 6},
          {month: 90, sales: 23},
          {month: 100, sales: 7}
        ];
        $scope.width = 600;
        $scope.height = 300;
});