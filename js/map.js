'use strict';

var ADDRESSES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_IN_TIME = ['12:00', '13:00', '14:00'];
var CHECK_OUT_TIME = ['12:00', '13:00', '14:00'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var NUMBER_OF_PINS = 8;

var getElement = function (i) {
  var element = {
    'author': {
      'avatar': 'img/avatars/user0' + (i + 1) + '.png',
    },
    'offer': {
      'title': ADDRESSES[i],
      'address': '600, 350',
      'price': Math.floor(Math.random() * 999001 + 1000),
      'type': TYPE[Math.floor(Math.random() * TYPE.length)],
      'rooms': Math.floor(Math.random() * 5 + 1),
      'guests': Math.floor(Math.random() * 15),
      'checkin': CHECK_IN_TIME[Math.floor(Math.random() * CHECK_IN_TIME.length)],
      'checkout': CHECK_OUT_TIME[Math.floor(Math.random() * CHECK_OUT_TIME.length)],
      'features': FEATURES,
      'description': 'Великолепная квартира-студия в центре Токио.',
      'photos': PHOTOS
    },

    'location': {
      'x': Math.floor(Math.random() * 1200),
      'y': Math.floor(Math.random() * 631 + 130)
    }
  };
  return element;
};

var getArray = function () {
  var dataArray = [];
  for (var i = 0; i < NUMBER_OF_PINS; i++) {
    dataArray.push(getElement(i));
  }
  return dataArray;
};

var clearActiveClass = function () {
  var userDialog = document.querySelector('.map');
  userDialog.classList.remove('map--faded');
};

var renderPin = function (pin) {
  var pinElement = document.querySelector('#pin').content.querySelector('.map__pin').cloneNode(true);
  pinElement.style = 'left: ' + (pin.location.x - 25) + 'px; top: ' + (pin.location.y - 70) + 'px;';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;
  return pinElement;
};

var createTemplatesPin = function (dataArray) {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < dataArray.length; j++) {
    fragment.appendChild(renderPin(dataArray[j]));
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
  var photoString = '';
  for (var i = 0; i < photos.length; i++) {
    photoString += '<img src="' + photos[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья"></img>';
  }
  return photoString;
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
  switch (type) {
    case 'palace' : return 'Дворец ';
    case 'flat' : return 'Квартира';
    case 'house' : return 'Дом';
    case 'bungalo' : return 'Бунгало';
    default: return 'ХЗ';
  }
};

var createPinMapAndCard = function () {
  clearActiveClass();
  var dataArray = getArray();

  var pinList = document.querySelector('.map__pins');
  pinList.appendChild(createTemplatesPin(dataArray));

  var cardFragment = document.createDocumentFragment();
  cardFragment.appendChild(renderCard(dataArray[0]));

  var cardList = document.querySelector('.map');
  cardList.insertBefore(cardFragment, document.querySelector('.map__filters-container'));
};

createPinMapAndCard();
