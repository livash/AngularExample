'use strict';

eventsApp.directive('mySample', function() {
   // return directive definition object
    return {
        restrict: 'C',
        template: '<input type="text" ng-model="sampleData" /> {{sampleData}} <br/>',
        scope: {
            
        }
    } 
});