'use strict';

(function () {
  // данные для создания пина

  var NUMBER_OF_PINS = 8;
  var PIN_WIDTH = 25;
  var PIN_HEIGHT = 70;

  var ENTER_KEYCODE = 13;

  var pins = window.data.getPinsInstances(NUMBER_OF_PINS);

  var pinElement = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (element, pin, id) {
    var pinFragment = element.cloneNode(true);
    pinFragment.style.left = (pin.location.x - PIN_WIDTH) + 'px';
    pinFragment.style.top = (pin.location.y - PIN_HEIGHT) + 'px';
    pinFragment.querySelector('img').src = pin.author.avatar;
    pinFragment.querySelector('img').alt = pin.offer.title;
    pinFragment.addEventListener('click', function (evt) {
      window.map.updateCard(pins[evt.currentTarget.dataset.id]);
    });
    pinFragment.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        window.map.updateCard(pins[evt.currentTarget.dataset.id]);
      }
    });
    pinFragment.dataset.id = id;
    return pinFragment;
  };

  var createPinsTemplates = function () {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < pins.length; j++) {
      fragment.appendChild(renderPin(pinElement, pins[j], j));
    }
    return fragment;
  };

  var createPinMap = function () {
    var pinList = document.querySelector('.map__pins');
    pinList.appendChild(createPinsTemplates());
  };

  window.pins = {
    createPinMap: createPinMap
  };

})();
