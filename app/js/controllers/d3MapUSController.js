squidApp.controller('d3MapUSController', 
  function d3USMapController($scope) {
    $scope.title = "Interactive Map of the United States";
    
    const width = 1000,
          height = 600;
          
    var svg = d3.select('.map-us')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .style('background-color', '#fff');

    var drawMap = (usMap, stateDetails) => {
      // select all states from JSON
      var states = topojson.feature(usMap, usMap.objects.states).features;

      // assign projection properties
      var projection = d3.geo.mercator()
          .scale(900)
          .translate([width + 1000, height + 350]);

      // create path element using projection
      var path = d3.geo.path()
          .projection(projection);

      //add tooltips showing the ID (and lateron name) of each state
      var tip = d3.tip()
          .attr('class', 'state-name-tip')
          .attr('fill', '#ddd')
          .offset([0,0])
          .html((d, i) => {
            var state = stateDetails.states.find( obj => obj.id === d.id);
            return state.name;
          });

      svg.call(tip);
 
      // draw states
      svg.selectAll('.state')
          .data(states)
          .enter()
          .append('path')
          .attr('class', d => `state ${d.id}`)
          .attr('d', path)
          .on('mouseover', tip.show)
          .on('mouseleave', tip.hide);

      // draw state boundaries
      svg.append('path')
        .datum(topojson.mesh(usMap, usMap.objects.states))
        .attr('d', path)
        .attr('class', 'state-boundary');
        
      // add label for each state
      svg.selectAll('.state-label')
          .data(states)
          .enter()
          .append('text')
          .attr('class', 'state-label')
          .attr('transform', d => `translate(${ projection(d.geometry.coordinates[0][0][0]) })`)
          .attr('dy', '2em')
          .text( d => d.id )
          .style('font-size', '14px')
          .style('fill', 'transparent');
    };

    // load two data files and draw the map
    d3.json('../../content/us-states-10m.json', function (error, usMap) {
      if (error) return console.log(error);

      d3.json('../../content/us-state-details.json', function (err, stateDetails) {
        if (err) return console.log(err);
        
        drawMap(usMap, stateDetails);
      });

    });
});