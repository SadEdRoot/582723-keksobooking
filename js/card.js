// создание карточки и обновление карточки
'use strict';

(function () {
  var clear = function () {
    window.utils.removeClass('map__pin--active');
    instance.classList.add('hidden');
    document.removeEventListener('keydown', window.utils.onCardEscKeyDown);
  };

  var cratePin = function () {
    var cardFragment = document.createDocumentFragment();
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card').cloneNode(true);
    cardTemplate.querySelector('.popup__close').addEventListener('click', function () {
      clear();
    });
    cardFragment.appendChild(cardTemplate);
    window.map.instance.insertBefore(cardFragment, document.querySelector('.map__filters-container'));

  };

  cratePin();

  var instance = window.map.instance.querySelector('.map__card');
  clear();

  window.card = {
    instance: instance,
    clear: clear
  };

})();
