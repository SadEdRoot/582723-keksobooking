// модуль, который создаёт данные;

'use strict';

(function () {

  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECK_IN_TIMES = ['12:00', '13:00', '14:00'];
  var CHECK_OUT_TIMES = ['12:00', '13:00', '14:00'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var successHandler = function (pins) {
    console.log(pins);
    var pinArray = [];
    for (var i = 0; i < numberOfPins; i++) {
      pinArray.push(pins[i]);
      // pinArray.push(getPinData(i));
    }
    return pinArray;
    //return pins;
  };
  var errorHandler = function (errorMassage) {
    console.log(errorMassage);
  };

  // функция заполняющая массив с данным в нее мы запихиваем другую тему.
  /*
  var getPinData = function (i) {
    var x = window.utils.getRandomFromRange(window.map.EDGE_MAP_X_MAX, window.map.EDGE_MAP_X_MIN);
    var y = window.utils.getRandomFromRange(window.map.EDGE_MAP_Y_MAX, window.map.EDGE_MAP_Y_MIN);
    var element = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png',
      },
      'offer': {
        'title': TITLES[i],
        'address': x + ', ' + y,
        'price': window.utils.getRandomFromRange(1000000, 1000),
        'type': TYPES[window.utils.getRandomFromRange(TYPES.length - 1)],
        'rooms': window.utils.getRandomFromRange(5, 1),
        'guests': window.utils.getRandomFromRange(15),
        'checkin': CHECK_IN_TIMES[window.utils.getRandomFromRange(CHECK_IN_TIMES.length - 1)],
        'checkout': CHECK_OUT_TIMES[window.utils.getRandomFromRange(CHECK_OUT_TIMES.length - 1)],
        'features': window.utils.getRandomLenghtFeatures(),
        'description': 'Великолепная квартира-студия в центре Токио.',
        'photos': window.utils.shuffleArray(PHOTOS)
      },

      'location': {
        'x': x,
        'y': y
      }
    };
    return element;
  };
  */

  var getPinsInstances = function (numberOfPins) {
    return window.backend.load(successHandler, errorHandler);

  };

  window.data = {
    'getPinsInstances': getPinsInstances
  };
})();
