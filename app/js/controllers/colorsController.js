'use strict';

eventsApp.controller('colorsController',
    function colorsController($scope) {
        var colors = ['red', 'green', 'blue', 'yellow', 'pink', 'brown', 'cyan', 'purple', 'grey', 'white', 'skyblue', 'gold', 'olive', 'crimson', 'darkcyan', 'darkgreen', 'darkred'];
        
        $scope.colors = _.shuffle(colors.map(function(el) {return el.toUpperCase(); }));
        
        $scope.showColorName = function($event, name) {
            $($event.currentTarget).toggleClass('no-text');
        }
        
        $scope.shuffleColors = function() {
            $scope.colors = _.shuffle($scope.colors);
        }
        
        $scope.removeColorNames = function() {
            $('.color-box').addClass('no-text');
        }  
    }
);