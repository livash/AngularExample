'use strict';

squidApp.directive('d3column', function() {
  
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'templates/directives/d3chart.html',
    scope: {
      data: '='
    },
    link: function(scope, element, attrs) {
      
    }
  }
});