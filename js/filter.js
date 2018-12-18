'use strict';

(function () {
  var filter = document.querySelector('.map__filters');
  var LOW_PRICE = 10000;
  var HIGHT_PRICE = 50000;

  var Categories = {
    ANY: 'any',
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high'
  };

  // функция фильтрации прогоняет исходный данные пина на полное совпадения условий формы
  var checkPin = function (pin) {

    var type = true;
    var room = true;
    var price = true;
    var guest = true;
    var feature = true;

    var featuresFromData = window.filter.data.getAll('features');

    if (window.filter.data.get('housing-type') !== Categories.ANY) {
      type = window.filter.data.get('housing-type') === pin.offer.type;
    }

    if (window.filter.data.get('housing-price') !== Categories.ANY) {
      switch (window.filter.data.get('housing-price')) {
        case Categories.LOW:
          price = pin.offer.price < LOW_PRICE;
          break;
        case Categories.MIDDLE:
          price = pin.offer.price >= LOW_PRICE && pin.offer.price <= HIGHT_PRICE;
          break;
        case Categories.HIGH:
          price = pin.offer.price > HIGHT_PRICE;
          break;
      }
    }
    if (window.filter.data.get('housing-rooms') !== Categories.ANY) {
      room = parseInt(window.filter.data.get('housing-rooms'), 10) === pin.offer.rooms;
    }
    if (window.filter.data.get('housing-guests') !== Categories.ANY) {
      guest = parseInt(window.filter.data.get('housing-guests'), 10) === pin.offer.guests;
    }

    if (featuresFromData.length !== 0) {
      for (var feat in featuresFromData) {
        if (pin.offer.features.indexOf(featuresFromData[feat]) === -1) {
          feature = false;
        }
      }
    }

    return type && room && price && guest && feature;
  };

  // фильтрует исходные данные и записывает их в глобальную переменную, с этими данными работают отрисовка пинов и карточки
  var updateFilterData = function () {
    window.filter.data = new FormData(filter);
    window.filter.filteredData = window.data.pins.filter(function (pin) {
      return checkPin(pin);
    });
  };

  // запускает фильтрацию данных и перерисовывает пины
  var updatePins = window.debounce(function () {
    updateFilterData();
    window.map.removePins();
    window.pins.createMap(window.filter.filteredData);
  });

  filter.querySelectorAll('select, input[type=checkbox]').forEach(function (item) {
    item.addEventListener('change', updatePins);
  });

  window.filter = {
    updateFilterData: updateFilterData
  };
})();
