'use strict';

var squidApp = angular.module('squidApp', ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider.when('/starwars',
            {
                templateUrl: 'templates/StarWarsData.html',
                controller: 'starWarsController'
            }
        );
        $routeProvider.when('/colors',
            {
                templateUrl: 'templates/Colors.html',
                controller: 'colorsController'
            }
        );
        $routeProvider.when('/capitals',
            {
                templateUrl: 'templates/Capitals.html',
                controller: 'capitalsController'
            }
        );
        $routeProvider.when('/dates',
            {
                templateUrl: 'templates/Dates.html',
                controller: 'datesController'
            }
        );
        $routeProvider.when('/d3',
            {
                templateUrl: 'templates/d3Examples.html',
                controller: 'd3ExamplesController'
            }
        );
        $routeProvider.otherwise({redirectTo: '/starwars'});
});

squidApp.filter('momentFormatDate', function () {
   return function (dateString) {
       return moment(dateString, 'YYYYMMDD').fromNow();
   };
});

squidApp.filter('customFormatDate', function () {
    return function (dateString) {
        var now = new Date(),
            then = new Date(dateString),
            oneDay = 1000 * 60 * 60 * 24,
            delta = now - then,
            numDays = Math.floor(delta / oneDay);

        if (numDays === 0 || numDays > 1) {
            return numDays + ' days ago';
        } else if (numDays === 1) {
            return '1 day ago';
        } else {
            numDays *= (-1);
            return numDays + ' from now';
        }
    };
});

squidApp.controller('capitalsController',
    function capitalsController($scope) {
        var data = [
            {
                country: 'USA',
                capital: 'Washington D.C.' 
            },
            {
                country: 'Russia',
                capital: 'Moscow'
            },
            {
                country: 'Ukraine',
                capital: 'Kyiv'
            },
            {
                country: 'Germany',
                capital: 'Berlin'
            }
        ];

        $scope.countries = data;

        $scope.showCapital = function(event, name) {
            $(event.currentTarget).text(name);
        };
});
squidApp.controller('colorsController',
    function colorsController($scope) {
        var colors = ['red', 'green', 'blue', 'yellow', 'pink', 'brown', 'cyan', 'purple', 'grey', 'white', 'skyblue', 'gold', 'olive', 'crimson', 'darkcyan', 'darkgreen', 'darkred'];

        $scope.colors = _.shuffle(colors.map(function(el) {return el.toUpperCase(); }));
        $scope.description = 'Clicking on each color will give you its name. Enjoy';
        $scope.shuffleButtonText = 'Shuffle colors';
        $scope.removeButtonText = 'Remove color names';

        $scope.showColorName = function($event, name) {
            $($event.currentTarget).toggleClass('no-text');
        };

        $scope.shuffleColors = function() {
            $scope.colors = _.shuffle($scope.colors);
        };

        $scope.removeColorNames = function() {
            $('.color-box').addClass('no-text');
        };
});
squidApp.controller('d3ExamplesController',
    function capitalsController($scope) {
        $scope.d3Version = d3.version;
        $scope.data = [
          {x: 10, y: 20},
          {x: 20, y: 14},
          {x: 30, y: 20},
          {x: 40, y: 21},
          {x: 50, y: 15},
          {x: 60, y: 22},
          {x: 70, y: 9},
          {x: 80, y: 6},
          {x: 90, y: 23},
          {x: 100, y: 7}
        ];
        $scope.width = 600;
        $scope.height = 150;
        $scope.margin = {
          left: 25,
          top: 35,
          right: 25,
          bottom: 25
        };
});
squidApp.controller('datesController',
    function starWarsController($scope) {
        $scope.description = 'Example of using filters for formatting dates.';
        $scope.dates = [
            '2016-04-22T22:44:27Z',
            '2016-04-21T22:44:27Z',
            '2016-04-01T22:44:27Z',
            '2015-04-22T22:44:27Z'
        ];
});

squidApp.controller('starWarsController',
    function starWarsController($scope, starWarsDataService) {
        $scope.description = 'Data from STAR WARS API https://swapi.co/';

        getPeople();

        function getPeople() {
            starWarsDataService.getAllPeople()
                .then(function (response) {
                    $scope.people = response.data.results;
                }, function (error) {
                    $scope.status = 'Unable to retreive data';
            });
        }
});

squidApp.directive('countryCard', function() {
    return {
        restrict: 'C',
        templateUrl: '/templates/directives/countryCard.html',
        scope: {
            country: "="
        }
    }; 
});
squidApp.directive('d3line', function() {
  // default values
  var height = 100,
      width = 400;

  // method returns an object with sorted arrays of X and Y values    
  var getSortedArrays = function(data) {
    var xVals = [],
        yVals = [];

    data.forEach(function(el, i) {
      xVals.push(el.x);
      yVals.push(el.y);
    });

    return {
      xVals: _.sortBy(xVals, function(x) { return x; }),
      yVals: _.sortBy(yVals, function(y) { return y; })
    };
  };

  var getMargin = function(margin) {
      return {
        left: !!(margin) ? margin.left : 0,
        top: !!(margin) ? margin.top : 0,
        right: !!(margin) ? margin.right : 0,
        bottom: !!(margin) ? margin.bottom : 0
      };
  };

  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/templates/directives/d3chart.html',
    scope: {
      data: '=',
      width: '=',
      height: '=',
      margin: '='
    },
    link: function(scope, element, attrs) {
      var sorted = getSortedArrays(scope.data);
      var margin = getMargin(scope.margin);
      var w = scope.width ? scope.width : width;
      var h = scope.height ? scope.height: height;
    
      var xScale = d3.scale.linear()
                  .domain([sorted.xVals[0], sorted.xVals[sorted.xVals.length - 1]])
                  .range([0, (w - margin.left - margin.right)]);
      var yScale = d3.scale.linear()
                  .domain([sorted.yVals[0], sorted.yVals[sorted.yVals.length - 1]])
                  .range([(h - margin.top - margin.bottom), 0]);

      var lineFun = d3.svg.line()
         .x(function(d) { return xScale(d.x); })
         .y(function(d) { return yScale(d.y); })
         .interpolate("linear");

      var svg = d3.select(".d3-chart")
                   .append("svg")
                   .attr({ width: w, height: h })
                   .style("background-color", "pink")
                   .attr("class", "d3-line");

      var g = svg.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var graph = g.append("path")
                     .attr({
                       d: lineFun(scope.data),
                       stroke: "purple",
                       "stroke-width": 2,
                       fill: "none"
                     });

      // add labels
      var labels = g.selectAll("text")
         .data(scope.data)
         .enter()
         .append("text")
         .text(function(d) { return d.y; })
         .attr({
           x: function(d) { return xScale(d.x);},
           y: function(d) {return yScale(d.y) - 15;}, // -15 is to position text above the data point
           "text-anchor": "middle",
           "font-size": "14px",
           "font-weight": function(d, i) {
             if (i === 0 || i === (scope.data.length - 1)) {
               return "bold";
             } else {
               return "normal";
             }
           }
         });
       
        // add circles
       var circles = g.selectAll("circle")
         .data(scope.data)
         .enter()
         .append("circle")
         .attr({
           cx: function(d) {return xScale(d.x); },
           cy: function(d) {return yScale(d.y);},
           r: 5,
           stroke: "#333",
           fill: '#fff'
         });
    }
  };
});
squidApp.directive('d3column', function() {
  // defaults
  var width = 600,
      height = 200,
      spacing = 10, // horizontal spacing between bars
      margin = {
        left: 25,
        top: 50,
        right: 25,
        bottom: 25
      };

  // method returns an object with sorted arrays of X and Y values    
  var getSortedArrays = function(data) {
    var xVals = [],
        yVals = [];

    data.forEach(function(el, i) {
      xVals.push(el.x);
      yVals.push(el.y);
    });

    return {
      xVals: _.sortBy(xVals, function(x) { return x; }),
      yVals: _.sortBy(yVals, function(y) { return y; })
    };
  };

  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'templates/directives/d3chart.html',
    scope: {
      data: '='
    },
    link: function(scope, element, attrs) {

      var barWidth = Math.floor( (width - margin.left - margin.right) / scope.data.length) - spacing;
      var sorted = getSortedArrays(scope.data);
      var yScale = d3.scale.linear()
              .domain([sorted.yVals[0], sorted.yVals[sorted.yVals.length - 1]])
              .range([(height - margin.top - margin.bottom), 0]);

      // create svg for the chart
      var svg = d3.select('.d3-chart')
              .append("svg")
              .attr({ width: width, height: height})
              .attr('class', 'd3-column-chart')
              .style('background-color', '#5EFB6E');

      svg.append('text')
          .attr('class', 'd3-column-chart-title')
          .attr('x', margin.left)
          .attr('y', margin.top - 25)
          .text('Hover over columns');

      // all chart element are inside a group element
      // it is used to apply margin to all elements of the chart
      var g = svg.append('g')
              .attr('transform', "translate(" + margin.left + "," + margin.top + ")");

      // use external library for tootips in d3, called d3.tip
      var tip = d3.tip()
              .attr('class', 'd3-tip-column')
              .attr('fill', '#ddd')
              .offset([-10, 0])
              .html(function(d, i) {
                return "<strong>Value: </strong><span style='color: red;'>" + d.y + "</span>"; 
              });

     // apply tooltip
     g.call(tip);

     // draw rectangles for columns/bars
     var rect = g.selectAll('rect')
        .data(scope.data)
        .enter()
        .append('rect')
          .attr('x', function(d, i) { return i* ((width - margin.left - margin.right) / scope.data.length); })
          .attr('y', function(d, i) { return yScale(d.y); })
          .attr('width', barWidth)
          .attr('height', function(d, i) { return height - yScale(d.y) - margin.bottom; })
          .attr('class', 'd3-column')
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide);
    }
  };
});
squidApp.directive('personCard', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/templates/directives/personCard.html',
        scope: {
            person: '=person'
        }
    };
});
squidApp.factory('starWarsDataService', ['$http', function($http) {
    var urlBase = 'http://swapi.co/api/';
    var starWarsDataService = {};

    starWarsDataService.getAllPeople = function () {
        return $http.get(urlBase + 'people?format=json');
    };

    return starWarsDataService;
}]);
'use strict';

