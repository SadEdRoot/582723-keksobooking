'use strict';

(function () {
  var filter = document.querySelector('.map__filters');

  // функция фильтрации прогоняет исходный данные пина на полное совпадения условий формы
  var checkElement = function (pin) {
    var LOW_PRICE = 10000;
    var HIGHT_PRICE = 50000;

    var Categories = {
      any: 'any',
      low: 'low',
      middle: 'middle',
      high: 'high'
    };

    var type = true;
    var rooms = true;
    var price = true;
    var guests = true;
    var features = true;

    var featuresFromData = window.filter.data.getAll('features');

    if (window.filter.data.get('housing-type') !== Categories.any) {
      type = window.filter.data.get('housing-type') === pin.offer.type;
    }

    if (window.filter.data.get('housing-price') !== Categories.any) {
      switch (window.filter.data.get('housing-price')) {
        case Categories.low:
          price = pin.offer.price < LOW_PRICE;
          break;
        case Categories.middle:
          price = pin.offer.price >= LOW_PRICE && pin.offer.price <= HIGHT_PRICE;
          break;
        case Categories.high:
          price = pin.offer.price > HIGHT_PRICE;
          break;
      }
    }
    if (window.filter.data.get('housing-rooms') !== Categories.any) {
      rooms = parseInt(window.filter.data.get('housing-rooms'), 10) === pin.offer.rooms;
    }
    if (window.filter.data.get('housing-guests') !== Categories.any) {
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
