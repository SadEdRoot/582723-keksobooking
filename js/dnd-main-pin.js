'use strict';

(function () {
  var EDGE_MAP_Y_MAX = 630;
  var EDGE_MAP_Y_MIN = 130;

  var edgeMapXMax = document.querySelector('.map').offsetWidth - window.map.MAIN_PIN_WIDTH;
  var edgeMapXMix = 0 - window.map.MAIN_PIN_WIDTH;


  window.map.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    // начальные координаты движения
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var xCoordinate = window.map.mainPin.offsetLeft - shift.x;
      var yCoordinate = window.map.mainPin.offsetTop - shift.y;

      if (yCoordinate < EDGE_MAP_Y_MAX && yCoordinate > EDGE_MAP_Y_MIN) {
        window.map.mainPin.style.top = (window.map.mainPin.offsetTop - shift.y) + 'px';
      }
      if (xCoordinate < edgeMapXMax && xCoordinate > edgeMapXMix) {
        window.map.mainPin.style.left = (window.map.mainPin.offsetLeft - shift.x) + 'px';
      }

      window.map.setAddress();
    };

    var onMouseUp = function () {
      if (!window.map.isActivated) {
        window.map.activate();
      }

      window.map.setAddress();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
