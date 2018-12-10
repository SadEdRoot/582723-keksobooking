// функция перемещения главного пина
'use strict';

(function () {
  window.map.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();


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

      if (yCoordinate < window.utils.EDGE_MAP_Y_MAX && yCoordinate > window.utils.EDGE_MAP_Y_MIN) {
        window.map.mainPin.style.top = (window.map.mainPin.offsetTop - shift.y) + 'px';
      }
      if (xCoordinate < window.utils.EDGE_MAP_X_MAX && xCoordinate > window.utils.EDGE_MAP_X_MIN) {
        window.map.mainPin.style.left = (window.map.mainPin.offsetLeft - shift.x) + 'px';
      }

      window.map.setAddress();
    };


    var onMouseUp = function () {
      if (!window.map.isMapActivated) {
        window.map.activateMap();
        window.map.createPinMap();
        window.map.isMapActivated = true;
      }

      window.map.setAddress();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
