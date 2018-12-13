'use strict';

(function () {

  // данные по размеру карты
  var MAIN_PIN_WIDTH = 32;
  var MAIN_PIN_HEIGHT = 76;
  var EDGE_MAP_X_MAX = document.querySelector('.map').offsetWidth - MAIN_PIN_WIDTH;
  var EDGE_MAP_X_MIN = 0 - MAIN_PIN_WIDTH;
  var EDGE_MAP_Y_MAX = 630;
  var EDGE_MAP_Y_MIN = 130;

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

  var activateMap = function () {
    map.classList.remove('map--faded');
    userForm.classList.remove('ad-form--disabled');
    var inputs = document.querySelectorAll('.ad-form  input, .ad-form select, .map__filters input, .map__filters select');
    inputs.forEach(function (item) {
      item.disabled = false;
    });
  };

  var disabledAllForm = function () {
    map.classList.add('map--faded');
    userForm.classList.add('ad-form--disabled');
    var inputs = document.querySelectorAll('.ad-form  input, .ad-form select, .map__filters input, .map__filters select');
    inputs.forEach(function (item) {
      item.disabled = true;
    });
  };

  var deactivateMap = function () {
    // начальные координа ты пина
    mainPin.style = 'left: 570px; top: 375px';
    setAddress();
    map.removeChild(document.querySelector('.map__card'));
    Array.from(mapPins.querySelectorAll('.map__pin')).forEach(function (pin) {
      if (!pin.classList.contains('map__pin--main')) {
        mapPins.removeChild(pin);
      }
    });
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
    var cardElement = map.querySelector('.map__card');
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
    map.querySelector('.map__card').style.display = 'block';
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
    isMapActivated: false, // глобальный флаг
    map: map,
    mapPins: mapPins,
    EDGE_MAP_X_MAX: EDGE_MAP_X_MAX,
    EDGE_MAP_X_MIN: EDGE_MAP_X_MIN,
    EDGE_MAP_Y_MAX: EDGE_MAP_Y_MAX,
    EDGE_MAP_Y_MIN: EDGE_MAP_Y_MIN,
    userForm: userForm,
    updateCard: updateCard
  };
})();


