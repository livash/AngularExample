'use strict';

squidApp.directive('d3line', function() {
  
  // constants
  var h = 100,
      w = 400,
      xScale = 3,
      yScale = 2.5;

  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/templates/directives/d3line.html',
    scope: {
      data: '='
    },
    link: function(scope, element, attrs) {
      
      var lineFun = d3.svg.line()
         .x(function(d) { return d.month * xScale; })
         .y(function(d) { return h - d.sales * yScale; })
         .interpolate("linear");

       var svg = d3.select("#d3-line")
                   .append("svg")
                   .attr({
                     width: w,
                     height: h
                   })
                   .style("background-color", "pink");

       var graph = svg.append("path")
                     .attr({
                       d: lineFun(scope.data),
                       "stroke": "purple",
                       "stroke-width": 2,
                       "fill": "none"
                     });

       // add labels
       var labels = svg.selectAll("text")
         .data(scope.data)
         .enter()
         .append("text")
         .text(function(d) { return d.sales; })
         .attr({
           x: function(d) { return d.month * xScale;},
           y: function(d) {return h - d.sales * yScale - 15;},
           "text-anchor": "middle",
           "font-size": "14px",
           "font-weight": function(d, i) {
             if (i === 0 || i === (scope.data.length - 1)) {
               return "bold";
             } else {
               return "normal";
             }
           }
         });

       var circles = svg.selectAll("circle")
         .data(scope.data)
         .enter()
         .append("circle")
         .attr({
           cx: function(d) {return d.month * xScale; },
           cy: function(d) {return h - d.sales * yScale;},
           r: 5,
           stroke: "#333",
           fill: '#fff'
         });
    }
  };
});