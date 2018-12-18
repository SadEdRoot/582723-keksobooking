'use strict';

(function () {
  // данные по размеру карты
  var MAIN_PIN_WIDTH = 32;
  var MAIN_PIN_HEIGHT = 76;
  var MAIN_PIN_INITIAL_POSITION = {left: 570, top: 375};

  var AccomodationType = {
    BUNGALO: 'Бунгало',
    HOUSE: 'Дом',
    PALACE: 'Дворец',
    FLAT: 'Квартира'
  };

  var instance = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mainPin = mapPins.querySelector('.map__pin--main');
  var adressInput = document.querySelector('#address');
  var userForm = document.querySelector('.ad-form');
  var filteBox = document.querySelector('.map__filters-container');

  var showFilter = function () {
    var inputs = filteBox.querySelectorAll('.map__filters input, .map__filters select');
    inputs.forEach(function (item) {
      item.disabled = false;
    });
  };

  var activateMap = function () {
    instance.classList.remove('map--faded');
    userForm.classList.remove('ad-form--disabled');
    var inputs = document.querySelectorAll('.ad-form  input, .ad-form select');
    inputs.forEach(function (item) {
      item.disabled = false;
    });
    window.data.getPinsInstances();
    window.map.isMapActivated = true;
  };

  var disableForm = function () {
    instance.classList.add('map--faded');
    userForm.classList.add('ad-form--disabled');
    var inputs = document.querySelectorAll('.ad-form  input, .ad-form select, .map__filters input, .map__filters select');
    inputs.forEach(function (item) {
      item.disabled = true;
    });
  };

  var removePins = function () {
    window.card.clear();
    Array.from(mapPins.querySelectorAll('.map__pin')).forEach(function (pin) {
      if (!pin.classList.contains('map__pin--main')) {
        mapPins.removeChild(pin);
      }
    });
  };

  var resetMainPinPosition = function () {
    mainPin.style.left = MAIN_PIN_INITIAL_POSITION.left + 'px';
    mainPin.style.top = MAIN_PIN_INITIAL_POSITION.top + 'px';
  };

  var deactivateMap = function () {
    resetMainPinPosition();
    setAddress();
    removePins();
    disableForm();
    window.map.isMapActivated = false;
  };


  var addEscKeyDown = function () {
    document.addEventListener('keydown', window.utils.onCardEscKeyDown);
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

  // функция обновления карточки активного пина
  var updateCard = function (pin) {
    window.card.instance.querySelector('.popup__title').textContent = pin.offer.title;
    window.card.instance.querySelector('.popup__text--address').textContent = pin.offer.address;
    window.card.instance.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
    window.card.instance.querySelector('.popup__type').textContent = AccomodationType[pin.offer.type];
    window.card.instance.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
    window.card.instance.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
    window.card.instance.querySelector('.popup__features').innerHTML = addFeaturesToCard(pin.offer.features);
    window.card.instance.querySelector('.popup__description').textContent = pin.offer.description;
    window.card.instance.querySelector('.popup__photos').innerHTML = addPhotosToCard(pin.offer.photos);
    window.card.instance.querySelector('.popup__avatar').src = pin.author.avatar;
    window.card.instance.classList.remove('hidden');
    addEscKeyDown();
  };

  // наверное можно изменить параметры с координат которыу x,y?
  var setAddress = function () {
    var xCoordinate = parseInt(mainPin.style.left, 10);
    var yCoordinate = parseInt(mainPin.style.top, 10);
    adressInput.value = (xCoordinate + MAIN_PIN_WIDTH) + ', ' + (yCoordinate + MAIN_PIN_HEIGHT);
  };

  window.map = {
    mainPin: mainPin,
    activateMap: activateMap,
    deactivateMap: deactivateMap,
    setAddress: setAddress,
    isMapActivated: false,
    instance: instance,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    mapPins: mapPins,
    removePins: removePins,
    userForm: userForm,
    updateCard: updateCard,
    showFilter: showFilter
  };
})();


