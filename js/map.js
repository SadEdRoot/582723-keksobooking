'use strict';

var ADDRESSES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_IN_TIMES = ['12:00', '13:00', '14:00'];
var CHECK_OUT_TIMES = ['12:00', '13:00', '14:00'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var NUMBER_OF_PINS = 8;
var PIN_WIDTH = 25;
var PIN_HEIGHT = 70;

var getRandomFromDiapason = function (max, min) {
  min = min || 0;
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

var getRandomLenghtFeatures = function (features) {
  var cutArray = features.slice(0, getRandomFromDiapason(features.length));
  return cutArray;
};

var shuffleArray = function (photos) {
  var bufferArray = photos.slice();
  for (var i = bufferArray.length - 1; i > 1; i--) {
    var x = bufferArray[i];
    var j = getRandomFromDiapason(i - 1);
    bufferArray[i] = bufferArray[j];
    bufferArray[j] = x;
  }
  return bufferArray;
};

var getPinData = function (i) {
  var element = {
    'author': {
      'avatar': 'img/avatars/user0' + (i + 1) + '.png',
    },
    'offer': {
      'title': ADDRESSES[i],
      'address': getRandomFromDiapason(600) + ', ' + getRandomFromDiapason(350),
      'price': getRandomFromDiapason(1000000, 1000),
      'type': TYPES[getRandomFromDiapason(TYPES.length - 1)],
      'rooms': getRandomFromDiapason(5, 1),
      'guests': getRandomFromDiapason(15),
      'checkin': CHECK_IN_TIMES[getRandomFromDiapason(CHECK_IN_TIMES.length - 1)],
      'checkout': CHECK_OUT_TIMES[getRandomFromDiapason(CHECK_OUT_TIMES.length - 1)],
      'features': getRandomLenghtFeatures(FEATURES),
      'description': 'Великолепная квартира-студия в центре Токио.',
      'photos': shuffleArray(PHOTOS)
    },

    'location': {
      'x': getRandomFromDiapason(1200),
      'y': getRandomFromDiapason(630, 130)
    }
  };
  return element;
};

var getPinsArray = function () {
  var dataArray = [];
  for (var i = 0; i < NUMBER_OF_PINS; i++) {
    dataArray.push(getPinData(i));
  }
  return dataArray;
};

var clearActiveClass = function () {
  var userDialog = document.querySelector('.map');
  userDialog.classList.remove('map--faded');
};

var renderPin = function (Element, pin) {
  var pinElement = Element.cloneNode(true);
  pinElement.style = 'left: ' + (pin.location.x - PIN_WIDTH) + 'px; top: ' + (pin.location.y - PIN_HEIGHT) + 'px;';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;
  return pinElement;
};

var createPinsTemplates = function (pins) {
  var pinElement = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < pins.length; j++) {
    fragment.appendChild(renderPin(pinElement, pins[j]));
  }
  return fragment;
};

var addFeaturesToCard = function (features) {
  var featurString = '';
  for (var i = 0; i < features.length; i++) {
    featurString += '<li class="popup__feature popup__feature--' + features[i] + '"></li>';
  }
  return featurString;
};

var addPhotosToCard = function (photos) {
  var photoElements = '';
  for (var i = 0; i < photos.length; i++) {
    photoElements += '<img src="' + photos[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья"></img>';
  }
  return photoElements;
};

var renderCard = function (pin) {
  var cardElement = document.querySelector('#card').content.querySelector('.map__card').cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = pin.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = pin.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = getType(pin.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
  cardElement.querySelector('.popup__features').innerHTML = addFeaturesToCard(pin.offer.features);
  cardElement.querySelector('.popup__description').textContent = pin.offer.description;
  cardElement.querySelector('.popup__photos').innerHTML = addPhotosToCard(pin.offer.photos);
  cardElement.querySelector('.popup__avatar').src = pin.author.avatar;
  return cardElement;
};

var getType = function (type) {
  var types = {
    'palace': 'Дворец ',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };
  return types[type];
};

var createPinMapAndCard = function () {
  clearActiveClass();
  var dataArray = getPinsArray();

  var pinList = document.querySelector('.map__pins');
  pinList.appendChild(createPinsTemplates(dataArray));

  var cardFragment = document.createDocumentFragment();
  cardFragment.appendChild(renderCard(dataArray[0]));

  var cardList = document.querySelector('.map');
  cardList.insertBefore(cardFragment, document.querySelector('.map__filters-container'));
};

createPinMapAndCard();
