squidApp.controller('d3MapsController',
  function d3MapsController($scope) {
    $scope.title = "Map of the United Kingdom";
    
    var svg = d3.select('.map-uk').append('svg')
              .attr('width', 900)
              .attr('height', 500)
              .style('background-color', '#fff');
    
    d3.json('./../../content/uk.json', (error, ukMap) => {
      if (error) return console.log(error);
      
      svg.append('path')
          .datum(topojson.feature(ukMap, ukMap.objects.subunits))
          .attr('d', d3.geo.path().projection(d3.geo.mercator()));
    });
  
});