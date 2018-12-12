// создание карточки и обновление карточки
'use strict';

(function () {

  var ESC_KEYCODE = 27;

  var clearCard = function () {
    window.utils.removeClass('map__pin--active');
    window.map.cardList.querySelector('.map__card').style.display = 'none';
    document.removeEventListener('keydown', onCardEscKeyDown);
  };

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
    window.map.cardList.insertBefore(cardFragment, document.querySelector('.map__filters-container'));
    clearCard();
  };

  window.card = {
    onCardEscKeyDown: onCardEscKeyDown,
    cratePinCard: cratePinCard
  };

})();
