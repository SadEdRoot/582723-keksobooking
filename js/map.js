'use strict';

var ADDRESSES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_IN_TIME = ['12:00', '13:00', '14:00'];
var CHECK_OUT_TIME = ['12:00', '13:00', '14:00'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var dataArray = [];

var getElement = function (i) {
  // Создаем элемент для массива
  var element = {
    'author': {
      'avatar': 'img/avatars/user0' + (i + 1) + '.png', // где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
    },

    'offer': {
      'title': ADDRESSES[i], // строка, заголовок предложения, одно из фиксированных значений . Значения не должны повторяться.
      'address': '600, 350', // строка, адрес предложения, представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
      'price': Math.floor(Math.random() * 999001 + 1000), // число, случайная цена от 1000 до 1000000
      'type': TYPE[Math.floor(Math.random() * TYPE.length)], // строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
      'rooms': Math.floor(Math.random() * 6), // число, случайное количество комнат от 1 до 5
      'guests': Math.floor(Math.random() * 15), // число, случайное количество гостей, которое можно разместить
      'checkin': CHECK_IN_TIME[Math.floor(Math.random() * CHECK_IN_TIME.length)], // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
      'checkout': CHECK_OUT_TIME[Math.floor(Math.random() * CHECK_OUT_TIME.length)], // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
      'features': FEATURES, // массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
      'description': 'Великолепная квартира-студия в центре Токио.', // пустая строка,
      'photos': PHOTOS // массив из строк "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg" и "http://o0.github.io/assets/images/tokyo/hotel3.jpg" расположенных в произвольном порядке
    },

    'location': {
      'x': Math.floor(Math.random() * 1200), // случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
      'y': Math.floor(Math.random() * 631 + 130) // случайное число, координата y метки на карте от 130 до 630.
    }
  };
  return element;
};

for (var i = 0; i < 8; i++) {
  dataArray.push(getElement(i));
}

// Временая уборка класса
var userDialog = document.querySelector('.map');
userDialog.classList.remove('map--faded');

// создание шаблонов
// находим место куда вставлять
var pinList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + (pin.location.x - 25) + 'px; top: ' + (pin.location.y - 70) + 'px;';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;
  return pinElement;
};


var fragment = document.createDocumentFragment();

for (var j = 0; j < 8; j++) {
  fragment.appendChild(renderPin(dataArray[j]));
}

pinList.appendChild(fragment);

// отрисовка данных в карточку
var cardList = document.querySelector('.map');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var cardFragment = document.createDocumentFragment();

var getType = function (type) {
  switch (type) {
    case 'palace' : return 'Дворец ';
    case 'flat' : return 'Квартира';
    case 'house' : return 'Дом';
    case 'bungalo' : return 'Бунгало';
    default: return 'ХЗ';
  }
};

var renderCard = function (pin) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = pin.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = pin.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = getType(pin.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
  // cardElement.querySelector('.popup__features').textContent = pin.offer.features;
  cardElement.querySelector('.popup__description').textContent = pin.offer.description;
  // cardElement.querySelector('.popup__photos').textContent = pin.offer.title;
  cardElement.querySelector('.popup__avatar').src = pin.author.avatar;
  return cardElement;
};

cardFragment.appendChild(renderCard(dataArray[0]));

cardList.insertBefore(cardFragment, document.querySelector('.map__filters-container'));
