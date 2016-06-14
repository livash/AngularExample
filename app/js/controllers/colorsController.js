squidApp.controller('colorsController',
  function colorsController($scope) {
    let colors = ['red', 'green', 'blue', 'yellow', 'pink', 'brown', 'cyan', 'purple', 'grey', 'white', 'skyblue', 'gold', 'olive', 'crimson', 'darkcyan', 'darkgreen', 'darkred'];
    console.log({XXX: colors.length});
    $scope.colors = _.shuffle( colors.map((el) => el.toUpperCase()) );
    $scope.description = 'Clicking on each color will give you its name. Enjoy';
    $scope.shuffleButtonText = 'Shuffle colors';
    $scope.removeButtonText = 'Remove color names';
    $scope.showColorName = ($event, name) => {
      $($event.currentTarget).toggleClass('no-text');
    };
    $scope.removeColorNames = () => {
      $('.color-box').addClass('no-text');
    };
    $scope.shuffleColors = () => {
      $scope.removeColorNames();
      $scope.colors = _.shuffle($scope.colors);
    };
});