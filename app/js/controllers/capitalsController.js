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