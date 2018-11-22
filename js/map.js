'use strict';

var ADDRESSES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_IN_TIME = ['12:00', '13:00', '14:00'];
var CHECK_OUT_TIME = ['12:00', '13:00', '14:00'];

var dataArray = [];

var getElement = function (i) {
  // Создаем элемент для массива
  var element = {
    'author': {
      'avatar': 'img/avatars/user0' + i + '.png', // где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
    },

    'offer': {
      'title': ADDRESSES[i], // строка, заголовок предложения, одно из фиксированных значений . Значения не должны повторяться.
      'address': '600, 350', // строка, адрес предложения, представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
      'price': TYPE[Math.floor(Math.random() * TYPE.length)], // число, случайная цена от 1000 до 1000000
      'type': Math.floor(Math.random() * 6), // строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
      'rooms': Math.floor(Math.random() * 6), // число, случайное количество комнат от 1 до 5
      'guests': Math.floor(Math.random() * 15), // число, случайное количество гостей, которое можно разместить
      'checkin': CHECK_IN_TIME[Math.floor(Math.random() * CHECK_IN_TIME.length)], // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
      'checkout': CHECK_OUT_TIME[Math.floor(Math.random() * CHECK_OUT_TIME.length)], // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
      'features': [], // массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
      'description': '', // пустая строка,
      'photos': [] // массив из строк "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg" и "http://o0.github.io/assets/images/tokyo/hotel3.jpg" расположенных в произвольном порядке
    },

    'location': {
      'x': Math.floor(Math.random() * 6), // случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
      'y': Math.floor(Math.random() * 631 - 130) // случайное число, координата y метки на карте от 130 до 630.
    }
  };
  return element;
};

for (var i = 0; i < 8; i++) {
  dataArray.push(getElement());
}

// Временая уборка класса
var userDialog = document.querySelector('.map');
userDialog.classList.remove('map--faded');

// создание шаблонов
