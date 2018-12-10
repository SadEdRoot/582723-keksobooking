'use strict';

(function () {
  var MAIN_PIN_WIDTH = 32;
  var MAIN_PIN_HEIGHT = 76;
  var EDGE_MAP_X_MAX = document.querySelector('.map').offsetWidth - MAIN_PIN_WIDTH;
  var EDGE_MAP_X_MIN = 0 - MAIN_PIN_WIDTH;
  var EDGE_MAP_Y_MAX = 630;
  var EDGE_MAP_Y_MIN = 130;

  window.utils = {
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    EDGE_MAP_X_MAX: EDGE_MAP_X_MAX,
    EDGE_MAP_X_MIN: EDGE_MAP_X_MIN,
    EDGE_MAP_Y_MAX: EDGE_MAP_Y_MAX,
    EDGE_MAP_Y_MIN: EDGE_MAP_Y_MIN
  };
})();
