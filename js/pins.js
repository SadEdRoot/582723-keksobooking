'use strict';

(function () {
  // данные для создания пина
  var NUMBER_OF_PINS = 5;
  var PIN_WIDTH = 25;
  var PIN_HEIGHT = 70;
  var ENTER_KEYCODE = 13;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var updatePinClass = function (element) {
    window.utils.removeClass('map__pin--active');
    element.classList.add('map__pin--active');
  };

  var renderPin = function (element, pin, id) {
    var pinFragment = element.cloneNode(true);
    pinFragment.style.left = (pin.location.x - PIN_WIDTH) + 'px';
    pinFragment.style.top = (pin.location.y - PIN_HEIGHT) + 'px';
    pinFragment.querySelector('img').src = pin.author.avatar;
    pinFragment.querySelector('img').alt = pin.offer.title;
    pinFragment.addEventListener('click', function (evt) {
      updatePinClass(evt.currentTarget);
      window.map.updateCard(window.filter.filteredData[evt.currentTarget.dataset.id]);
    });
    pinFragment.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        updatePinClass(evt.currentTarget);
        window.map.updateCard(window.filter.filteredData[evt.currentTarget.dataset.id]);
      }
    });
    pinFragment.dataset.id = id;
    return pinFragment;
  };

  var createPinsTemplates = function (pins) {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < Math.min(NUMBER_OF_PINS, pins.length); j++) {
      fragment.appendChild(renderPin(pinTemplate, pins[j], j));
    }
    return fragment;
  };

  var createMap = function (dataSet) {
    window.map.mapPins.appendChild(createPinsTemplates(dataSet));
  };

  window.pins = {
    createMap: createMap
  };

})();
