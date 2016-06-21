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
    },
    {
        country: 'France',
        capital: 'Paris'
    },
    {
        country: 'Italy',
        capital: 'Rome'
    }
  ];

  $scope.description = 'Guess the capital of this country';
  $scope.countries = data;
  $scope.showCapital = (event, idx) => {
      let {country, capital} = $scope.countries[idx];
      if ($(event.currentTarget).text() === country) {
          $(event.currentTarget).text(capital);
      } else {
          $(event.currentTarget).text(country);
      }
  };
});
