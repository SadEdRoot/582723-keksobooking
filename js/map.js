'use strict';

(function () {

  var PIN_WIDTH = 25;
  var PIN_HEIGHT = 70;
  var ENTER_KEYCODE = 13;

  var AccomodationType = {
    BUNGALO: 'Бунгало',
    HOUSE: 'Дом',
    PALACE: 'Дворец',
    FLAT: 'Квартира'
  };

  var cardList = document.querySelector('.map');


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

  var mainPin = document.querySelector('.map__pin--main');
  var adressInput = document.querySelector('#address');
  var map = document.querySelector('.map');
  var userForm = document.querySelector('.ad-form');

  var activateMap = function () {
    map.classList.remove('map--faded');
    userForm.classList.remove('ad-form--disabled');
    var inputs = document.querySelectorAll('.ad-form  input, .ad-form select, .map__filters input, .map__filters select');
    inputs.forEach(function (item) {
      item.disabled = false;
    });
  };

  var pinElement = document.querySelector('#pin').content.querySelector('.map__pin');


  var addEscKeyDown = function () {
    document.addEventListener('keydown', onCardEscKeyDown);
  };

  var updateCard = function (pin) {
    var cardElement = cardList.querySelector('.map__card');
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
    cardList.querySelector('.map__card').style.display = 'block';
    addEscKeyDown();
  };


  var renderPin = function (element, pin, id) {
    var pinFragment = element.cloneNode(true);
    pinFragment.style.left = (pin.location.x - PIN_WIDTH) + 'px';
    pinFragment.style.top = (pin.location.y - PIN_HEIGHT) + 'px';
    pinFragment.querySelector('img').src = pin.author.avatar;
    pinFragment.querySelector('img').alt = pin.offer.title;
    pinFragment.addEventListener('click', function (evt) {
      updateCard(window.data.pins[evt.currentTarget.dataset.id]);
    });
    pinFragment.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        updateCard(window.data.pins[evt.currentTarget.dataset.id]);
      }
    });
    pinFragment.dataset.id = id;
    return pinFragment;
  };

  var createPinsTemplates = function () {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < window.data.pins.length; j++) {
      fragment.appendChild(renderPin(pinElement, window.data.pins[j], j));
    }
    return fragment;
  };

  var createPinMap = function () {
    var pinList = document.querySelector('.map__pins');
    pinList.appendChild(createPinsTemplates());
  };

  // наверное можно изменить параметры с координат которыу x,y?
  var setAddress = function () {
    var xCoordinate = parseInt(mainPin.style.left, 10);
    var yCoordinate = parseInt(mainPin.style.top, 10);
    adressInput.value = (xCoordinate + window.utils.MAIN_PIN_WIDTH) + ', ' + (yCoordinate + window.utils.MAIN_PIN_HEIGHT);
  };

  // по идеи глобальный флаг
  var isMapActivated = false;

  window.map = {
    createPinMap: createPinMap,
    mainPin: mainPin,
    activateMap: activateMap,
    setAddress: setAddress,
    isMapActivated: isMapActivated,
    cardList: cardList
  };
})();


