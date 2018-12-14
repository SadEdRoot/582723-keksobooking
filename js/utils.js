'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var mainFrame = document.querySelector('main');

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

  var removeClass = function (className) {
    var elementWithClass = document.querySelector('.' + className);
    if (elementWithClass) {
      elementWithClass.classList.remove(className);
    }
  };

  var closeError = function () {
    mainFrame.removeChild(document.querySelector('.error'));
    document.removeEventListener('keydown', onErrorEscKeyDown);
  };


  var onErrorEscKeyDown = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeError();
    }
  };

  // может тоже переписать в более универсальные функции?
  var createErrorMessage = function () {
    mainFrame.appendChild(document.getElementById('error').content.querySelector('.error').cloneNode(true));
    var errorMassage = document.querySelector('.error');
    errorMassage.addEventListener('click', closeError);
    document.addEventListener('keydown', onErrorEscKeyDown);
  };

  var createSuccessMessage = function () {
    mainFrame.appendChild(document.getElementById('success').content.querySelector('.success').cloneNode(true));
    var errorMassage = document.querySelector('.success');
    errorMassage.addEventListener('click', closeError);
    document.addEventListener('keydown', onErrorEscKeyDown);
  };

  window.utils = {
    getRandomFromRange: getRandomFromRange,
    getRandomLenghtFeatures: getRandomLenghtFeatures,
    shuffleArray: shuffleArray,
    removeClass: removeClass,
    createErrorMessage: createErrorMessage,
    createSuccessMessage: createSuccessMessage
  };
})();
