'use strict';

(function () {

  // данные по размеру карты
  var MAIN_PIN_WIDTH = 32;
  var MAIN_PIN_HEIGHT = 76;
  var EDGE_MAP_X_MAX = document.querySelector('.map').offsetWidth - MAIN_PIN_WIDTH;
  var EDGE_MAP_X_MIN = 0 - MAIN_PIN_WIDTH;
  var EDGE_MAP_Y_MAX = 630;
  var EDGE_MAP_Y_MIN = 130;
  var MAIN_PIN_INITIAL_POSITION = {left: 570, top: 375};

  var AccomodationType = {
    BUNGALO: 'Бунгало',
    HOUSE: 'Дом',
    PALACE: 'Дворец',
    FLAT: 'Квартира'
  };

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mainPin = mapPins.querySelector('.map__pin--main');
  var adressInput = document.querySelector('#address');
  var userForm = document.querySelector('.ad-form');
  var filteBox = document.querySelector('.map__filters-container');


  var hideFilter = function () {
    filteBox.classList.add('hidden');
  };

  var showFilter = function () {
    filteBox.classList.remove('hidden');
  };


  var activateMap = function () {
    map.classList.remove('map--faded');
    userForm.classList.remove('ad-form--disabled');
    var inputs = document.querySelectorAll('.ad-form  input, .ad-form select, .map__filters input, .map__filters select');
    inputs.forEach(function (item) {
      item.disabled = false;
    });
    window.data.getPinsInstances();
    window.map.isMapActivated = true;
  };

  var disabledAllForm = function () {
    map.classList.add('map--faded');
    userForm.classList.add('ad-form--disabled');
    var inputs = document.querySelectorAll('.ad-form  input, .ad-form select, .map__filters input, .map__filters select');
    inputs.forEach(function (item) {
      item.disabled = true;
    });
    hideFilter();
  };

  var removePins = function () {
    window.card.clearCard();
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
    disabledAllForm();
    window.map.isMapActivated = false;
  };


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

  // функция обновления карточки активного пина
  var updateCard = function (pin) {
    window.card.card.querySelector('.popup__title').textContent = pin.offer.title;
    window.card.card.querySelector('.popup__text--address').textContent = pin.offer.address;
    window.card.card.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
    window.card.card.querySelector('.popup__type').textContent = AccomodationType[pin.offer.type];
    window.card.card.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
    window.card.card.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
    window.card.card.querySelector('.popup__features').innerHTML = addFeaturesToCard(pin.offer.features);
    window.card.card.querySelector('.popup__description').textContent = pin.offer.description;
    window.card.card.querySelector('.popup__photos').innerHTML = addPhotosToCard(pin.offer.photos);
    window.card.card.querySelector('.popup__avatar').src = pin.author.avatar;
    window.card.card.classList.remove('hidden');
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
    map: map,
    mapPins: mapPins,
    removePins: removePins,
    EDGE_MAP_X_MAX: EDGE_MAP_X_MAX,
    EDGE_MAP_X_MIN: EDGE_MAP_X_MIN,
    EDGE_MAP_Y_MAX: EDGE_MAP_Y_MAX,
    EDGE_MAP_Y_MIN: EDGE_MAP_Y_MIN,
    userForm: userForm,
    updateCard: updateCard,
    showFilter: showFilter
  };
})();


