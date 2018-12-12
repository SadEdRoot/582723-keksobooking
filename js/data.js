// модуль, который создаёт данные;

'use strict';

(function () {

  var successHandler = function (response) {
    var pins = response.filter(function (pin) {
      return pin.offer !== null;
    });
    window.data.pins = pins;
    window.pins.createPinMap();
  };

  var errorHandler = function (errorMassage) {
    console.log(errorMassage);
  };

  var getPinsInstances = function () {
    window.backend.load(successHandler, errorHandler);
  };

  window.data = {
    'getPinsInstances': getPinsInstances
  };
})();
