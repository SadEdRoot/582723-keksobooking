// модуль, который создаёт данные;

'use strict';

(function () {

  var successHandler = function (response) {
    window.data.pins = response.filter(function (pin) {
      return pin.offer !== null;
    });
    window.map.showFilter();
    window.filter.updateFilterData();
    window.pins.createMap(window.filter.filteredData);
  };

  var errorHandler = function (errorMassage) {
    window.utils.createErrorMessage(errorMassage);
  };

  var getPinsInstances = function () {
    window.backend.load(successHandler, errorHandler);
  };

  window.data = {
    getPinsInstances: getPinsInstances
  };
})();
