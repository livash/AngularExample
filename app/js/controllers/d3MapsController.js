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
      
      svg.selectAll('.subunit')
          .data(subunits)
          .enter()
          .append('path')
          .attr('class', function(d) { return "subunit " + d.id; })
          .attr('d', path);
    });
  
});