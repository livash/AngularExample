squidApp.controller('d3MapUSController', 
  function d3USMapController($scope) {
    $scope.title = "Map of the United States: counties";
    
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
      var counties = topojson.feature(usMap, usMap.objects.counties).features;

      // assign projection properties
      var projection = d3.geo.mercator()
          .scale(450)
          .translate([width +450, height + 50]);

      // create path element using projection
      var path = d3.geo.path()
          .projection(projection);
 
      // draw counties
      svg.selectAll('.county')
          .data(counties)
          .enter()
          .append('path')
          .attr('class', d => `county ${d.id}`)
          .attr('d', path);

      // draw county boundaries
      svg.append('path')
        .datum(topojson.mesh(usMap, usMap.objects.counties))
        .attr('d', path)
        .attr('class', 'county-boundary');
    });
});