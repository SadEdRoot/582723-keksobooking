'use strict';

(function () {
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

  window.utils = {
    getRandomFromRange: getRandomFromRange,
    getRandomLenghtFeatures: getRandomLenghtFeatures,
    shuffleArray: shuffleArray
  };
})();
