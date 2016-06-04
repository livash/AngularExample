'use strict';

squidApp.directive('d3line', function() {
  // constants
  var height = 100,
      width = 400,
      yScale = 2.5;
  
  // method returns an object with sorted arrays of X and Y values    
  var getSortedArrays = function(data) {
    var xVals = [],
        yVals = [];

    data.forEach(function(el, i) {
      xVals.push(el.x);
      yVals.push(el.y);
    });
    xVals.sort();
    yVals.sort();
    
    return {
      xVals: xVals,
      yVals: yVals
    };
  };
  
  var getMargin = function(margin) {
      return {
        left: !!(margin) ? margin.left : 0,
        top: !!(margin) ? margin.top : 0,
        right: !!(margin) ? margin.right : 0,
        bottom: !!(margin) ? margin.bottom : 0
      };
  };

  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/templates/directives/d3chart.html',
    scope: {
      data: '=',
      width: '=',
      height: '=',
      margin: '='
    },
    link: function(scope, element, attrs) {
      var measures = getSortedArrays(scope.data);
      var margin = getMargin(scope.margin);
      var w = scope.width ? scope.width : width;
      var h = scope.height ? scope.height: height;
      
      var xScale = d3.scale.linear()
                  .domain([measures.xVals[0], measures.xVals[measures.xVals.length - 1]])
                  .range([0, w]);
      
      var lineFun = d3.svg.line()
         .x(function(d) { return xScale(d.x); })
         .y(function(d) { return h - d.y * yScale; })
         .interpolate("linear");

       var svg = d3.select(".d3-chart")
                   .append("svg")
                   .attr({
                     width: w,
                     height: h
                   })
                   .style("background-color", "pink")
                   .attr("class", "d3-line");

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
         .text(function(d) { return d.y; })
         .attr({
           x: function(d) { return xScale(d.x);},
           y: function(d) {return h - d.y * yScale - 15;},
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
         
        // add circles
       var circles = svg.selectAll("circle")
         .data(scope.data)
         .enter()
         .append("circle")
         .attr({
           cx: function(d) {return xScale(d.x); },
           cy: function(d) {return h - d.y * yScale;},
           r: 5,
           stroke: "#333",
           fill: '#fff'
         });
    }
  };
});