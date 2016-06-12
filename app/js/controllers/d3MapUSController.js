squidApp.controller('d3MapUSController', 
  function d3USMapController($scope) {
    $scope.title = "Map of the United States";
    
    const width = 1000,
          height = 600;
          
    var svg = d3.select('.map-us')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .style('background-color', '#fff');

    d3.json('../../content/us-states-10m.json', function(error, usMap) {
      if (error) return console.log(error);

      // select all states from JSON
      var states = topojson.feature(usMap, usMap.objects.states).features;

      // assign projection properties
      var projection = d3.geo.mercator()
          .scale(900)
          .translate([width + 1000, height + 350]);

      // create path element using projection
      var path = d3.geo.path()
          .projection(projection);
 
      // draw states
      svg.selectAll('.state')
          .data(states)
          .enter()
          .append('path')
          .attr('class', d => `state ${d.id}`)
          .attr('d', path);

      // add tooltips showing the ID (and lateron name) of each state
      var tip = d3.tip()
          .attr('class', 'state-name-tip')
          .attr('fill', '#ddd')
          .offset([-10,0])
          .html((d, i) => {console.log(d); return `State number ${d.id}`});

      svg.call(tip);

      // draw state boundaries
      svg.append('path')
        .datum(topojson.mesh(usMap, usMap.objects.states))
        .attr('d', path)
        .attr('class', 'state-boundary');
    });
});