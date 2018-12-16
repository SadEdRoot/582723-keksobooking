'use strict';

(function () {
  var filter = document.querySelector('.map__filters');

  // функция фильтрации прогоняет исходный данные пина на полное совпадения условий формы
  var checkElement = function (pin) {
    var type = true;
    var rooms = true;
    var price = true;
    var guests = true;
    var features = true;

    var lowPrice = 10000;
    var highPrice = 50000;

    var featuresFromData = window.filter.data.getAll('features');

    if (window.filter.data.get('housing-type') !== 'any') {
      type = window.filter.data.get('housing-type') === pin.offer.type;
    }

    if (window.filter.data.get('housing-price') !== 'any') {
      switch (window.filter.data.get('housing-price')) {
        case 'low':
          price = pin.offer.price < lowPrice;
          break;
        case 'middle':
          price = pin.offer.price >= lowPrice && pin.offer.price <= highPrice;
          break;
        case 'high':
          price = pin.offer.price > highPrice;
          break;
      }
    }
    if (window.filter.data.get('housing-rooms') !== 'any') {
      rooms = parseInt(window.filter.data.get('housing-rooms'), 10) === pin.offer.rooms;
    }
    if (window.filter.data.get('housing-guests') !== 'any') {
      guests = parseInt(window.filter.data.get('housing-guests'), 10) === pin.offer.guests;
    }

    if (featuresFromData.length !== 0) {
      for (var feat in featuresFromData) {
        if (pin.offer.features.indexOf(featuresFromData[feat]) === -1) {
          features = false;
        }
      }
    }

    return type && rooms && price && guests && features;
  };

  // фильтрует исходные данные и записывает их в глобальную переменную, с этими данными работают отрисовка пинов и карточки
  var updateFilterData = function () {
    window.filter.data = new FormData(filter);
    window.filter.filteredData = window.data.pins.filter(function (pins) {
      return checkElement(pins);
    });
  };

  // запускает фильтрацию данных и перерисовывает пины
  var updatePins = window.debounce(function () {
    updateFilterData();
    window.map.removePins();
    window.pins.createPinMap(window.filter.filteredData);
  });

  filter.querySelectorAll('select, input[type=checkbox]').forEach(function (item) {
    item.addEventListener('change', updatePins);
  });


  window.filter = {
    updateFilterData: updateFilterData
  };
})();
