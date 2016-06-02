'use strict';

squidApp.directive('d3Line', function() {
  
  return {
    restrict: 'E',
    scope: {
      val: '='
    },
    link: function(scope, element, attrs) {
      
      // whenever the bound 'exp' changes, execute this
      //scope.$watch('exp', function(newVal, oldVal) {
        
      //});
    }
  };
});