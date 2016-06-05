squidApp.directive('d3column', function() {
  // defaults
  var width = 600,
      height = 200,
      spacing = 10, // horizontal spacing between bars
      margin = {
        left: 25,
        top: 50,
        right: 25,
        bottom: 25
      };

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

      // create svg for the chart
      var svg = d3.select('.d3-chart')
              .append("svg")
              .attr({ width: width, height: height})
              .attr('class', 'd3-column-chart')
              .style('background-color', '#5EFB6E');

      svg.append('text')
          .attr('class', 'd3-column-chart-title')
          .attr('x', margin.left)
          .attr('y', margin.top - 25)
          .text('Hover over columns');

      // all chart element are inside a group element
      // it is used to apply margin to all elements of the chart
      var g = svg.append('g')
              .attr('transform', "translate(" + margin.left + "," + margin.top + ")");

      // use an external library for tootips in d3, called d3.tip
      var tip = d3.tip()
              .attr('class', 'd3-tip-column')
              .attr('fill', '#ddd')
              .offset([-10, 0])
              .html(function(d, i) {
                return "<strong>Value: </strong><span style='color: red;'>" + d.y + "</span>"; 
              });

     // apply tooltip
     g.call(tip);

     // draw rectangles for columns/bars
     var rect = g.selectAll('rect')
        .data(scope.data)
        .enter()
        .append('rect')
          .attr('x', function(d, i) { return i* ((width - margin.left - margin.right) / scope.data.length); })
          .attr('y', function(d, i) { return yScale(d.y); })
          .attr('width', barWidth)
          .attr('height', function(d, i) { return height - yScale(d.y) - margin.bottom; })
          .attr('class', 'd3-column')
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide);
    }
  };
});