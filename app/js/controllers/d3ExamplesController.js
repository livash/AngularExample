'use strict';

squidApp.controller('d3ExamplesController',
    function capitalsController($scope) {
        $scope.d3Version = d3.version;
        
        var h = 100,
            w = 400,
            xScale = 3,
            yScale = 2.5,
            monthlySales = [
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
                        d: lineFun(monthlySales),
                        "stroke": "purple",
                        "stroke-width": 2,
                        "fill": "none"
                      });

        // add labels
        var labels = svg.selectAll("text")
          .data(monthlySales)
          .enter()
          .append("text")
          .text(function(d) { return d.sales; })
          .attr({
            x: function(d) { return d.month * xScale;},
            y: function(d) {return h - d.sales * yScale - 15;},
            "text-anchor": "middle",
            "font-size": "14px",
            "font-weight": function(d, i) {
              if (i === 0 || i === (monthlySales.length - 1)) {
                return "bold";
              } else {
                return "normal";
              }
            }
          });

        var circles = svg.selectAll("circle")
          .data(monthlySales)
          .enter()
          .append("circle")
          .attr({
            cx: function(d) {return d.month * xScale; },
            cy: function(d) {return h - d.sales * yScale;},
            r: 5,
            stroke: "#333",
            fill: '#fff'
          });
});