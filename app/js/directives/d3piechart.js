squidApp.directive('d3piechart', function() {
  // defaults
  var width = 500,
      height = 500,
      radius = Math.min(width, height) / 2;
  
  return {
    restrict: "E",
    replace: true,
    templateUrl: 'templates/directives/d3chart.html',
    scope: {
      data: '='
    },
    link: function(scope, element, attrs) {
      var color = d3.scale.ordinal()
          .range(['#3366cc', '#109618', '#990099', '#ff9900', '#dc3912', 'pink']);
      var arc = d3.svg.arc()
          .outerRadius(radius - 10)
          .innerRadius(0);
      
      var pie = d3.layout.pie()
          .sort(null)
          .value(function(d, i) { return d.y; });
      
      var svg = d3.select('.d3-chart')
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .attr('class', 'd3-pie-chart')
          .attr('fill', '#fff')
          .append('g')
          .attr('transform', "translate(" + width / 2 + "," + height / 2 + ")");

      var arcElement = svg.selectAll(".arc")
            .data(pie(scope.data))
            .enter()
            .append('g')
            .attr('class', 'arc');
      
      arcElement.append('path')
         .attr('d', arc) 
         .style('fill', function(d, i) { return color(i); });
    }
  };
});