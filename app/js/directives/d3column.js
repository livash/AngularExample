'use strict';

squidApp.directive('d3column', function() {
  // defaults
  var width = 600,
      height = 150,
      spacing = 10, // horizontal spacing between bars
      margin = {
        left: 25,
        top: 25,
        right: 25,
        bottom: 25
      }
      
  // method returns an object with sorted arrays of X and Y values    
  var getSortedArrays = function(data) {
    var xVals = [],
        yVals = [];

    data.forEach(function(el, i) {
      xVals.push(el.x);
      yVals.push(el.y);
    });

    return {
      xVals: _.sortBy(xVals, function(x) { return x; }),
      yVals: _.sortBy(yVals, function(y) { return y; })
    };
  };
  
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'templates/directives/d3chart.html',
    scope: {
      data: '='
    },
    link: function(scope, element, attrs) {
      
      var barWidth = Math.floor( (width - margin.left - margin.right) / scope.data.length) - spacing;
      var sorted = getSortedArrays(scope.data);
      var yScale = d3.scale.linear()
              .domain([sorted.yVals[0], sorted.yVals[sorted.yVals.length - 1]])
              .range([(height - margin.top - margin.bottom), 0]);
      
      var svg = d3.select('.d3-chart')
                .append("svg")
                .attr({ width: width, height: height})
                .attr('class', 'd3-column')
                .style('background-color', '#5EFB6E');
      
      var g = svg.append('g')
                .attr('transform', "translate(" + margin.left + "," + margin.top + ")");

      g.selectAll('rect')
        .data(scope.data)
        .enter()
        .append('rect')
          .attr('x', function(d, i) { return i* ((width - margin.left - margin.right) / scope.data.length); })
          .attr('y', function(d, i) { return yScale(d.y); })
          .attr('width', barWidth)
          .attr('height', function(d, i) { return height - yScale(d.y) - margin.bottom; })
          .attr('fill', '#FA5CEA')
          .attr('stroke', '#333');
    }
  }
});