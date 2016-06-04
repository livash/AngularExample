'use strict';

squidApp.directive('d3column', function() {
  // defaults
  var width = 600,
      height = 300;
  
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'templates/directives/d3chart.html',
    scope: {
      data: '='
    },
    link: function(scope, element, attrs) {
      
      var svg = d3.select(".d3-chart")
                .append("svg")
                .attr({ width: width, height: height})
                .attr("class", "d3-column")
                .style("background-color", " #5EFB6E");

      
    }
  }
});