squidApp.controller('starWarsController',
  function starWarsController(starWarsDataService) {
    let swCtrl = this;
    swCtrl.description = 'Data from STAR WARS API https://swapi.co/';
    
    let success = (response) => swCtrl.people = response.data.results;
    let failure = (error) => swCtrl.status = 'Unable to retreive data';
    let getPeople = () => starWarsDataService.getAllPeople().then(success, failure);

    getPeople();
});
