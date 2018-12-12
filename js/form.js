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

  userSelectType.addEventListener('change', syncTypeWithPrice);


  // функция расскараски невалидных полей. переделать в 2 функции с параметрами. отправка на форму проверка при отправке
  var submitBtn = window.map.userForm.querySelector('.ad-form__submit');

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

  var onSubmitBtnClick = function () {
    syncRoomAndCapacity(); // добавленно что бы отрабатовало без изменения значений.
    // syncTypeWithPrice();
    markError();
    if (window.map.userForm.checkValidity()) {
      // отправка формы
    } else {
      // добавить красный бордер
    }
    // evt.preventDefault();
  };

  //submitBtn.addEventListener('click', onSubmitBtnClick);

  window.map.userForm.addEventListener('submit', onSubmitBtnClick);

})();
