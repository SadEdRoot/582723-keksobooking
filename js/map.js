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
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var MAIN_PIN_WIDTH = 34;
var MAIN_PIN_HEIGHT = 76;

var AccomodationType = {
  BUNGALO: 'Бунгало',
  HOUSE: 'Дом',
  PALACE: 'Дворец',
  FLAT: 'Квартира'
};

var mainPin = document.querySelector('.map__pin--main');
var adressInput = document.querySelector('#address');
var map = document.querySelector('.map');
var userForm = document.querySelector('.ad-form');
var cardList = document.querySelector('.map');
var pinElement = document.querySelector('#pin').content.querySelector('.map__pin');

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

var getPinsInstances = function (numberOfPins) {
  var pinArray = [];
  for (var i = 0; i < numberOfPins; i++) {
    pinArray.push(getPinData(i));
  }
  return pinArray;
};

var pins = getPinsInstances(NUMBER_OF_PINS);

var activateMap = function () {
  map.classList.remove('map--faded');
  userForm.classList.remove('ad-form--disabled');
  var inputs = document.querySelectorAll('.ad-form  input, .ad-form select, .map__filters input, .map__filters select');
  inputs.forEach(function (item) {
    item.disabled = false;
  });
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

var clearCard = function () {
  cardList.querySelector('.map__card').style.display = 'none';
  document.removeEventListener('keydown', onCardEscKeyDown);
};

var onCardElementMouseClick = function (cardElement) {
  cardElement.querySelector('.popup__close').addEventListener('click', function () {
    clearCard();
  });
};

var onCardEscKeyDown = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    clearCard();
  }
};

var addEscKeyDown = function () {
  document.addEventListener('keydown', onCardEscKeyDown);
};

var createPinMap = function () {
  var pinList = document.querySelector('.map__pins');
  pinList.appendChild(createPinsTemplates());
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

var cratePinCard = function () {
  var cardFragment = document.createDocumentFragment();
  var cardElement = document.querySelector('#card').content.querySelector('.map__card').cloneNode(true);
  onCardElementMouseClick(cardElement);
  cardFragment.appendChild(cardElement);
  cardList.insertBefore(cardFragment, document.querySelector('.map__filters-container'));
  clearCard();
};

window.onload = function () {
  cratePinCard();
};


// Блок валидации формы

// Синхронизация поля количество гостей по полю количество комнат
var userRoomInput = userForm.querySelector('#room_number');
var userCapacity = userForm.querySelector('#capacity');

var availibelCupacity = {
  1: [1],
  2: [2, 1],
  3: [3, 2, 1],
  100: [0]
};

var syncRoomAndCapacity = function () {
  var room = parseInt(userRoomInput.value, 10);
  var capacity = parseInt(userCapacity.value, 10);
  if (availibelCupacity[room].indexOf(capacity) === -1) {
    userCapacity.setCustomValidity('Количество гостей не соотвествует количеству комнат');
  } else {
    userCapacity.setCustomValidity('');
  }
};

userRoomInput.addEventListener('change', syncRoomAndCapacity);
userCapacity.addEventListener('change', syncRoomAndCapacity);

// синхронизация полей время выезда
var userSelecteTimeIn = document.getElementById('timein');
var userSelectTimeOut = document.getElementById('timeout');


var syncTimeOut = function () {
  userSelectTimeOut.value = userSelecteTimeIn.value;
};

var syncTimeIn = function () {
  userSelecteTimeIn.value = userSelectTimeOut.value;
};

userSelecteTimeIn.addEventListener('change', syncTimeOut);
userSelectTimeOut.addEventListener('change', syncTimeIn);

// синхронизания полей тип жилья и цена
var userSelectType = document.getElementById('type');
var userSelectPrice = document.getElementById('price');

var typePrice = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

var syncTypeWithPrice = function (evt) {
  var price = typePrice[evt.target.value];
  userSelectPrice.min = price;
  userSelectPrice.placeholder = price;
};

userSelectType.addEventListener('change', syncTypeWithPrice);


// функция расскараски невалидных полей. переделать в 2 функции с параметрами. отправка на форму проверка при отправке
var submitBtn = userForm.querySelector('.ad-form__submit');

var markError = function () {
  var invalidInputArray = Array.from(userForm.querySelectorAll('select:invalid, input:invalid'));
  var validInputArray = Array.from(userForm.querySelectorAll('select:valid, input:valid'));
  invalidInputArray.forEach(function (item) {
    item.classList.add('error_form');
  });
  validInputArray.forEach(function (item) {
    item.classList.remove('error_form');
  });
};

var onSubmitBtnClick = function () {
  syncRoomAndCapacity(); // добавленно что бы отрабатовало без изменения значений.
  syncTypeWithPrice();
  markError();
  if (userForm.checkValidity()) {
    // отправка формы
  } else {
    // добавить красный бордер
  }
};

submitBtn.addEventListener('click', onSubmitBtnClick);

var activeMapFlag = false;

// функция перемещения главного пина
(function () {
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();


    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';

    };

    // наверное можно изменить параметры с координат которыу x,y
    var setAddress = function () {
      var style = mainPin.style;
      var xCoordinate = parseInt(style.left, 10);
      var yCoordinate = parseInt(style.top, 10);
      adressInput.value = (xCoordinate + MAIN_PIN_WIDTH) + ', ' + (yCoordinate + MAIN_PIN_HEIGHT);
    };

    var onMouseUp = function () {
      if (!activeMapFlag) {
        activateMap();
        createPinMap();
        activeMapFlag = true;
      }

      setAddress();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
