squidApp.directive('d3line', () => {
  // default values
  var height = 100,
      width = 400;

  // method returns an object with sorted arrays of X and Y values    
  var getSortedArrays = (data) => {
    var xVals = [],
        yVals = [];

    data.forEach((el, i) => {
      xVals.push(el.x);
      yVals.push(el.y);
    });

    return {
      xVals: _.sortBy(xVals, (x) => x),
      yVals: _.sortBy(yVals, (y) => y)
    };
  };

  var getMargin = (margin) => {
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
    template: '<div class="d3-chart line-chart"></div>',
    scope: {
      data: '=',
      width: '=',
      height: '=',
      margin: '='
    },
    link: (scope, element, attrs) => {
      var sorted = getSortedArrays(scope.data);
      var margin = getMargin(scope.margin);
      var w = scope.width ? scope.width : width;
      var h = scope.height ? scope.height: height;
    
      var xScale = d3.scale.linear()
                  .domain([sorted.xVals[0], sorted.xVals[sorted.xVals.length - 1]])
                  .range([0, (w - margin.left - margin.right)]);
      var yScale = d3.scale.linear()
                  .domain([sorted.yVals[0], sorted.yVals[sorted.yVals.length - 1]])
                  .range([(h - margin.top - margin.bottom), 0]);

      var lineFun = d3.svg.line()
         .x((d) => xScale(d.x))
         .y((d) => yScale(d.y))
         .interpolate("linear");

      var svg = d3.select(".d3-chart.line-chart")
                   .append("svg")
                   .attr({ width: w, height: h })
                   .style("background-color", "pink")
                   .attr("class", "d3-line");

      var g = svg.append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`);

      var graph = g.append("path")
                     .attr({
                       d: lineFun(scope.data),
                       stroke: "purple",
                       "stroke-width": 2,
                       fill: "none"
                     });

      // add labels
      var labels = g.selectAll("text")
         .data(scope.data)
         .enter()
         .append("text")
         .text((d) => d.y)
         .attr('x', (d) => xScale(d.x))
         .attr('y', (d) => yScale(d.y) - 15) // -15 is to position text above the data point
         .attr('text-anchor', 'middle')
         .attr('font-size', '14px')
         .attr('font-weight', (d, i) => {
           if (i === 0 || i === (scope.data.length - 1)) {
              return "bold";
            } else {
              return "normal";
            }
         });

        // add circles
       var circles = g.selectAll("circle")
         .data(scope.data)
         .enter()
         .append("circle")
         .attr({
           cx: (d) => (xScale(d.x)),
           cy: (d) => (yScale(d.y)),
           class: 'd3-line-data-circle',
           r: 5,
           stroke: "#333",
           fill: '#fff'
         });
    }
  };
});