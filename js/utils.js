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

  var onCardEscKeyDown = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.card.clearCard();
    }
  };

  // может тоже переписать в более универсальные функции?
  var errorTemplate = document.getElementById('error').content.querySelector('.error');

  var closeError = function () {
    mainFrame.removeChild(document.querySelector('.error'));
    document.removeEventListener('keydown', onErrorEscKeyDown);
  };

  var onErrorEscKeyDown = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeError();
    }
  };

  var createErrorMessage = function () {
    var errorsMassage = errorTemplate.cloneNode(true);
    mainFrame.appendChild(errorsMassage);
    errorsMassage.addEventListener('click', closeError);
    document.addEventListener('keydown', onErrorEscKeyDown);
  };

  // вторая походая структура которую неплохо бы сделать универсальной
  var successTemplate = document.getElementById('success').content.querySelector('.success');

  var closeSuccess = function () {
    mainFrame.removeChild(document.querySelector('.success'));
    document.removeEventListener('keydown', onSuccessEscKeyDown);
  };

  var onSuccessEscKeyDown = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeSuccess();
    }
  };

  var createSuccessMessage = function () {
    var successMassage = successTemplate.cloneNode(true);
    mainFrame.appendChild(successMassage);
    successMassage.addEventListener('click', closeSuccess);
    document.addEventListener('keydown', onSuccessEscKeyDown);
  };

  window.utils = {
    getRandomFromRange: getRandomFromRange,
    getRandomLenghtFeatures: getRandomLenghtFeatures,
    shuffleArray: shuffleArray,
    removeClass: removeClass,
    createErrorMessage: createErrorMessage,
    createSuccessMessage: createSuccessMessage,
    onCardEscKeyDown: onCardEscKeyDown
  };
})();
