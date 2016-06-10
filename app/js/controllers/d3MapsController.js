squidApp.controller('d3MapsController',
  function d3MapsController($scope) {
    $scope.title = "Map of the United Kingdom and Ireland";
    
    const width = 900,
          height = 1000;
    
    var svg = d3.select('.map-uk').append('svg')
              .attr('width', width)
              .attr('height', height)
              .style('background-color', '#fff');
    
    d3.json('./../../content/uk.json', (error, ukMap) => {
      if (error) return console.log(error);
      
      var subunits = topojson.feature(ukMap, ukMap.objects.subunits).features;
      var projection = d3.geo.mercator()
          .scale(2500)
          .translate([width - 300, height + 2400]);
      var path = d3.geo.path()
          .projection(projection);
      
      // add subunits as separate path elements
      // and asign to them class based on sunbunit.id (ENG, IRL, etc.)
      svg.selectAll('.subunit')
          .data(subunits)
          .enter()
          .append('path')
          .attr('class', d => `subunit ${d.id}`)
          .attr('d', path);

      // add boundary to each subunit by applying CSS class
      svg.append('path')
          .datum(topojson.mesh(ukMap, ukMap.objects.subunits))
          .attr('d', path)
          .attr('class', 'subunit-boundary');

      // add display for cities / places
      var placesPath = path.pointRadius([3]);
      svg.append('path')
          .datum(topojson.feature(ukMap, ukMap.objects.places))
          .attr('d', placesPath)
          .attr('class', 'place')
          .style('fill', '#444');
      
      // add label for each city / place
      svg.selectAll('.place-label')
          .data(topojson.feature(ukMap, ukMap.objects.places).features)
          .enter()
          .append('text')
          .attr('class', 'place-label')
          .attr('transform', d => `translate(${ projection(d.geometry.coordinates) })` )
          .attr('dy', '1em')
          .attr('x', d => d.geometry.coordinates[0] > -1 ? 7 : -7 )
          .text( d => d.properties.name )
          .style('font-size', '12px');
      
    });
  
});