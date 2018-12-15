// создание карточки и обновление карточки
'use strict';

(function () {

  var ESC_KEYCODE = 27;

  var clearCard = function () {
    window.utils.removeClass('map__pin--active');
    card.classList.add('hidden');
    document.removeEventListener('keydown', onCardEscKeyDown);
  };


  // переписать на utils.
  var onCardEscKeyDown = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      clearCard();
    }
  };


  var cratePinCard = function () {
    var cardFragment = document.createDocumentFragment();
    var cardElement = document.querySelector('#card').content.querySelector('.map__card').cloneNode(true);
    cardElement.querySelector('.popup__close').addEventListener('click', function () {
      clearCard();
    });
    cardFragment.appendChild(cardElement);
    window.map.map.insertBefore(cardFragment, document.querySelector('.map__filters-container'));

  };

  cratePinCard();

  var card = window.map.map.querySelector('.map__card');
  clearCard();

  window.card = {
    onCardEscKeyDown: onCardEscKeyDown,
    card: card,
    clearCard: clearCard
  };

})();
