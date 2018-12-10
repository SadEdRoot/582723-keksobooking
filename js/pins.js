'use strict';

(function () {
  // данные для создания пина

  var NUMBER_OF_PINS = 8;
  var PIN_WIDTH = 25;
  var PIN_HEIGHT = 70;

  var ENTER_KEYCODE = 13;

  var AccomodationType = {
    BUNGALO: 'Бунгало',
    HOUSE: 'Дом',
    PALACE: 'Дворец',
    FLAT: 'Квартира'
  };

  var pins = window.data.getPinsInstances(NUMBER_OF_PINS);

  var pinElement = document.querySelector('#pin').content.querySelector('.map__pin');

  var addEscKeyDown = function () {
    document.addEventListener('keydown', window.card.onCardEscKeyDown);
  };

  var addFeaturesToCard = function (features) {
    var feature = '';
    for (var i = 0; i < features.length; i++) {
      feature += '<li class="popup__feature popup__feature--' + features[i] + '"></li>';
    }
    return feature;
  };

  var addPhotosToCard = function (photos) {
    var photo = '';
    for (var i = 0; i < photos.length; i++) {
      photo += '<img src="' + photos[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья"></img>';
    }
    return photo;
  };


  var updateCard = function (pin) {
    var cardElement = window.map.cardList.querySelector('.map__card');
    cardElement.querySelector('.popup__title').textContent = pin.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = pin.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = AccomodationType[pin.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
    cardElement.querySelector('.popup__features').innerHTML = addFeaturesToCard(pin.offer.features);
    cardElement.querySelector('.popup__description').textContent = pin.offer.description;
    cardElement.querySelector('.popup__photos').innerHTML = addPhotosToCard(pin.offer.photos);
    cardElement.querySelector('.popup__avatar').src = pin.author.avatar;
    window.map.cardList.querySelector('.map__card').style.display = 'block';
    addEscKeyDown();
  };


  var renderPin = function (element, pin, id) {
    var pinFragment = element.cloneNode(true);
    pinFragment.style.left = (pin.location.x - PIN_WIDTH) + 'px';
    pinFragment.style.top = (pin.location.y - PIN_HEIGHT) + 'px';
    pinFragment.querySelector('img').src = pin.author.avatar;
    pinFragment.querySelector('img').alt = pin.offer.title;
    pinFragment.addEventListener('click', function (evt) {
      updateCard(pins[evt.currentTarget.dataset.id]);
    });
    pinFragment.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        updateCard(pins[evt.currentTarget.dataset.id]);
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
