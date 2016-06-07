squidApp.directive('d3piechart', function() {
  // defaults
  var width = 500,
      height = 500,
      margin = 25,
      innerRadius = 0;
  
  return {
    restrict: "E",
    replace: true,
    template: '<div class="d3-chart pie-chart"></div>',
    scope: {
      data: '=',
      donut: '=',
      width: '=',
      height: '='
    },
    link: function(scope, element, attrs) {
      width = !!(scope.width) ? scope.width : width;
      height = !!(scope.height) ? scope.height : height;
      var radius = Math.min(width, height) / 2;
      
      var color = d3.scale.ordinal()
          .range(['#3366cc', '#109618', '#990099', '#ff9900', '#dc3912','#ffff99', 'pink', '#7f7f00', '#00e577', ' #e77719']);
 
      // pie versus donut
      if (scope.donut === true) 
        innerRadius = (radius - margin) / 2;
    
      var arc = d3.svg.arc()
          .outerRadius(radius - margin)
          .innerRadius(innerRadius);
      
      var pie = d3.layout.pie()
          .sort(null)
          .value((d, i) => d.y);

      // use external library for tootips in d3, called d3.tip
      var tip = d3.tip()
            .attr('class', 'd3-tip-pie')
            .attr('fill', '#ddd')
            //.offset([-10, 0])
            .offset(function() {
              return [this.getBBox().height / 2, 0];
            })
            .html(function(d, i) {
              return `<strong>Value: </strong><span style='color: red;'>${d.data.y}</span>`; 
            });
      
      var svg = d3.select('.d3-chart.pie-chart')
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .attr('class', 'd3-pie-chart')
          .attr('fill', '#fff')
          .append('g')
          .attr('transform', `translate(${width/2}, ${height/2})`);

      // apply tool tip
      svg.call(tip);

      var arcElement = svg.selectAll(".arc")
            .data(pie(scope.data))
            .enter()
            .append('g')
            .attr('class', 'arc');
      
      arcElement.append('path')
         .attr('d', arc) 
         .style('fill', (d, i) => color(i))
         .on('mouseover', tip.show)
         .on('mouseout', tip.hide);
    }
  };
});