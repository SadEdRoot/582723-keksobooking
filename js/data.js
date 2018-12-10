// модуль, который создаёт данные;

'use strict';

(function () {

  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECK_IN_TIMES = ['12:00', '13:00', '14:00'];
  var CHECK_OUT_TIMES = ['12:00', '13:00', '14:00'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

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
    var x = getRandomFromRange(window.map.EDGE_MAP_X_MAX, window.map.EDGE_MAP_X_MIN);
    var y = getRandomFromRange(window.map.EDGE_MAP_Y_MAX, window.map.EDGE_MAP_Y_MIN);
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

  window.data = {
    'getPinsInstances': getPinsInstances
  };
})();
