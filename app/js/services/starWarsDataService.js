squidApp.factory('starWarsDataService', ['$http', ($http) => {
  let urlBase = 'http://swapi.co/api/';
  let url = `${urlBase}people?format=json`;
  
  return { 
    getAllPeople: () => $http.get(url)
  };
}]);