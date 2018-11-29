'use strict';

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_IN_TIMES = ['12:00', '13:00', '14:00'];
var CHECK_OUT_TIMES = ['12:00', '13:00', '14:00'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var NUMBER_OF_PINS = 8;
var PIN_WIDTH = 25;
var PIN_HEIGHT = 70;

var AccomodationType = {
  BUNGALO: 'Бунгало',
  HOUSE: 'Дом',
  PALACE: 'Дворец',
};
var adressInput = document.querySelector('#address');

var getRandomFromRange = function (max, min) {
  min = min || 0;
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

var getRandomLenghtFeatures = function () {
  var cutArray = FEATURES.slice(0, getRandomFromRange(FEATURES.length));
  return cutArray;
};

var shuffleArray = function (arr) {
  var bufferArray = arr.slice();
  for (var i = bufferArray.length - 1; i > 1; i--) {
    var x = bufferArray[i];
    var j = getRandomFromRange(i - 1);
    bufferArray[i] = bufferArray[j];
    bufferArray[j] = x;
  }
  return bufferArray;
};

var getPinData = function (i) {
  var x = getRandomFromRange(1200);
  var y = getRandomFromRange(630, 130);
  var element = {
    'author': {
      'avatar': 'img/avatars/user0' + (i + 1) + '.png',
    },
    'offer': {
      'title': TITLES[i],
      'address': x + ', ' + y,
      'price': getRandomFromRange(1000000, 1000),
      'type': TYPES[getRandomFromRange(TYPES.length - 1)],
      'rooms': getRandomFromRange(5, 1),
      'guests': getRandomFromRange(15),
      'checkin': CHECK_IN_TIMES[getRandomFromRange(CHECK_IN_TIMES.length - 1)],
      'checkout': CHECK_OUT_TIMES[getRandomFromRange(CHECK_OUT_TIMES.length - 1)],
      'features': getRandomLenghtFeatures(),
      'description': 'Великолепная квартира-студия в центре Токио.',
      'photos': shuffleArray(PHOTOS)
    },

    'location': {
      'x': x,
      'y': y
    }
  };
  return element;
};

var getPinsArray = function () {
  var pinArray = [];
  for (var i = 0; i < NUMBER_OF_PINS; i++) {
    pinArray.push(getPinData(i));
  }
  return pinArray;
};

var pins = getPinsArray();

var changeActiveClass = function () {
  var userDialog = document.querySelector('.map');
  var userForm = document.querySelector('.ad-form');

  userDialog.classList.remove('map--faded');
  userForm.classList.remove('ad-form--disabled');
  var inputs = document.querySelectorAll('.ad-form  input, .ad-form select, .map__filters input, .map__filters select');
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].disabled = false;
  }
};

var renderPin = function (element, pin) {
  var pinElement = element.cloneNode(true);
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

var renderCard = function (pin) {
  var cardElement = document.querySelector('#card').content.querySelector('.map__card').cloneNode(true);
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
  return cardElement;
};

var createPinMapAndCard = function () {
  var pinList = document.querySelector('.map__pins');
  pinList.appendChild(createPinsTemplates(pins));
  // возможно придеться переделать всю функцию на создание карты и отдельно на создание карточки при нажатии
  var cardFragment = document.createDocumentFragment();
  // фрагмент создаеться при чтении аттрибута дата у нажатого пина.
  cardFragment.appendChild(renderCard(pins[0]));

  var cardList = document.querySelector('.map');
  cardList.insertBefore(cardFragment, document.querySelector('.map__filters-container'));
};

var setAdress = function () {
  var text = mainPin.style;
  adressInput.value = text; // должно быть динамическое
};

var mainPin = document.querySelector('.map__pin--main');
mainPin.addEventListener('mouseup', function () {
  changeActiveClass();
  createPinMapAndCard();
  // заполнение формы адреса по координатам метки.
  // при этом их нужно сделать так что бы адресс вычеслялся сразуже при загрузке страницы
  setAdress();
});
