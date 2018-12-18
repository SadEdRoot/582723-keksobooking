'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var mainFrame = document.querySelector('main');

  var removeClass = function (className) {
    var elementWithClass = document.querySelector('.' + className);
    if (elementWithClass) {
      elementWithClass.classList.remove(className);
    }
  };

  var onCardEscKeyDown = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.card.clear();
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

  var closeSuccessMessage = function () {
    mainFrame.removeChild(document.querySelector('.success'));
    document.removeEventListener('keydown', onSuccessEscKeyDown);
  };

  var onSuccessEscKeyDown = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeSuccessMessage();
    }
  };

  var createSuccessMessage = function () {
    var successMassage = successTemplate.cloneNode(true);
    mainFrame.appendChild(successMassage);
    successMassage.addEventListener('click', closeSuccessMessage);
    document.addEventListener('keydown', onSuccessEscKeyDown);
  };

  window.utils = {
    removeClass: removeClass,
    createErrorMessage: createErrorMessage,
    createSuccessMessage: createSuccessMessage,
    onCardEscKeyDown: onCardEscKeyDown
  };
})();
