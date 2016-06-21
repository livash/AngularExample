squidApp.controller('capitalsController', function capitalsController($scope) {
  let data = [
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

  $scope.description = 'Guess the capital of this country';
  $scope.countries = data;
  $scope.showCapital = (event, name) => {
      $(event.currentTarget).text(name);
  };
});
