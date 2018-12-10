'use strict';

(function () {

  // данные по размеру карты
  var MAIN_PIN_WIDTH = 32;
  var MAIN_PIN_HEIGHT = 76;
  var EDGE_MAP_X_MAX = document.querySelector('.map').offsetWidth - MAIN_PIN_WIDTH;
  var EDGE_MAP_X_MIN = 0 - MAIN_PIN_WIDTH;
  var EDGE_MAP_Y_MAX = 630;
  var EDGE_MAP_Y_MIN = 130;

  var cardList = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var adressInput = document.querySelector('#address');
  var map = document.querySelector('.map');
  var userForm = document.querySelector('.ad-form');

  var activateMap = function () {
    map.classList.remove('map--faded');
    userForm.classList.remove('ad-form--disabled');
    var inputs = document.querySelectorAll('.ad-form  input, .ad-form select, .map__filters input, .map__filters select');
    inputs.forEach(function (item) {
      item.disabled = false;
    });
  };

  // наверное можно изменить параметры с координат которыу x,y?
  var setAddress = function () {
    var xCoordinate = parseInt(mainPin.style.left, 10);
    var yCoordinate = parseInt(mainPin.style.top, 10);
    adressInput.value = (xCoordinate + MAIN_PIN_WIDTH) + ', ' + (yCoordinate + MAIN_PIN_HEIGHT);
  };

  // глобальный флаг
  var isMapActivated = false;

  window.map = {
    mainPin: mainPin,
    activateMap: activateMap,
    setAddress: setAddress,
    isMapActivated: isMapActivated,
    cardList: cardList,
    EDGE_MAP_X_MAX: EDGE_MAP_X_MAX,
    EDGE_MAP_X_MIN: EDGE_MAP_X_MIN,
    EDGE_MAP_Y_MAX: EDGE_MAP_Y_MAX,
    EDGE_MAP_Y_MIN: EDGE_MAP_Y_MIN,
    userForm: userForm
  };
})();


