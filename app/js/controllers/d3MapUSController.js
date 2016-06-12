squidApp.controller('d3MapUSController', 
  function d3USMapController($scope) {
    $scope.title = "Map of the United Statestop";
    
    const width = 1000,
          height = 800;
          
    var svg = d3.select('.map-us')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .style('background-color', '#fff');

    d3.json('../../content/us-states-10m.json', function(error, usMap) {
      if (error) return console.log(error);

      // select all counties from JSON
      var states = topojson.feature(usMap, usMap.objects.states).features;

      // assign projection properties
      var projection = d3.geo.mercator()
          .scale(450)
          .translate([width +450, height + 50]);

      // create path element using projection
      var path = d3.geo.path()
          .projection(projection);
 
      // draw counties
      svg.selectAll('.state')
          .data(states)
          .enter()
          .append('path')
          .attr('class', d => `state ${d.id}`)
          .attr('d', path);

      // draw county boundaries
      svg.append('path')
        .datum(topojson.mesh(usMap, usMap.objects.states))
        .attr('d', path)
        .attr('class', 'state-boundary');
    });
});