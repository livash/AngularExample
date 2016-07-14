squidApp.controller('d3ExamplesController',
  function capitalsController() {
    let d3Ctrl = this;
    d3Ctrl.d3Version = d3.version;
    d3Ctrl.data = [
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
    d3Ctrl.width = 600;
    d3Ctrl.height = 150;
    d3Ctrl.margin = {
      left: 25,
      top: 35,
      right: 25,
      bottom: 25
    };
});