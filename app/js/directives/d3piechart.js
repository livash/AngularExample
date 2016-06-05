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
          .range(['#3366cc', '#109618', '#990099', '#ff9900', '#dc3912','#ffff99', 'pink', '#7f7f00', '#00e577', ' #e77719']);
      var arc = d3.svg.arc()
          .outerRadius(radius - 10)
          .innerRadius(0);
      
      var pie = d3.layout.pie()
          .sort(null)
          .value(function(d, i) { return d.y; });

      // use external library for tootips in d3, called d3.tip
      var tip = d3.tip()
              .attr('class', 'd3-tip-column')
              .attr('fill', '#ddd')
              //.offset([-10, 0])
              .offset(function() {
                return [this.getBBox().height / 2, 0];
              })
              .html(function(d, i) {
                return "<strong>Value: </strong><span style='color: red;'>" + d.data.y + "</span>"; 
              });
      
      var svg = d3.select('.d3-chart')
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .attr('class', 'd3-pie-chart')
          .attr('fill', '#fff')
          .append('g')
          .attr('transform', "translate(" + width / 2 + "," + height / 2 + ")");

      // apply tool tip
      svg.call(tip);

      var arcElement = svg.selectAll(".arc")
            .data(pie(scope.data))
            .enter()
            .append('g')
            .attr('class', 'arc');
      
      arcElement.append('path')
         .attr('d', arc) 
         .style('fill', function(d, i) { return color(i); })
         .on('mouseover', tip.show)
         .on('mouseout', tip.hide);
    }
  };
});