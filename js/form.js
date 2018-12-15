// Блок валидации формы
'use strict';
// Синхронизация поля количество гостей по полю количество комнат

(function () {
  var userRoomInput = window.map.userForm.querySelector('#room_number');
  var userCapacity = window.map.userForm.querySelector('#capacity');

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
  // кажеться нужно сделать еще одну утилиту что бы синхронизовать форму при
  userSelectType.addEventListener('change', syncTypeWithPrice);

  var markError = function () {
    var invalidInputArray = Array.from(window.map.userForm.querySelectorAll('select:invalid, input:invalid'));
    var validInputArray = Array.from(window.map.userForm.querySelectorAll('select:valid, input:valid'));
    invalidInputArray.forEach(function (item) {
      item.classList.add('error_form');
    });
    validInputArray.forEach(function (item) {
      item.classList.remove('error_form');
    });
  };

  var onError = function () {
    // Добавьте обработку возможных ошибок при загрузке: покажите сообщение об ошибке в блоке main, используя блок #error из шаблона template
    window.utils.createErrorMessage();
  };

  var onSuccess = function () {
    window.map.userForm.reset();
    // вызов окна сообщения о успехе
    window.utils.createSuccessMessage();
  };

  var onSubmit = function (evt) {
    evt.preventDefault();
    syncRoomAndCapacity(); // эту команду нужно сделать во время проверки а не во время сабмита. сабмит уже отправляет данные.
    markError(); // вообще не нужна по идеи
    window.backend.save(new FormData(window.map.userForm), onSuccess, onError);
  };

  var onReset = function () {
    window.map.deactivateMap();
  };

  window.map.userForm.addEventListener('submit', onSubmit);
  window.map.userForm.addEventListener('reset', onReset);

})();

