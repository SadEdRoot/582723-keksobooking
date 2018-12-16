// создание карточки и обновление карточки
'use strict';

(function () {
  var clearCard = function () {
    window.utils.removeClass('map__pin--active');
    card.classList.add('hidden');
    document.removeEventListener('keydown', window.utils.onCardEscKeyDown);
  };

  var cratePinCard = function () {
    var cardFragment = document.createDocumentFragment();
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card').cloneNode(true);
    cardTemplate.querySelector('.popup__close').addEventListener('click', function () {
      clearCard();
    });
    cardFragment.appendChild(cardTemplate);
    window.map.map.insertBefore(cardFragment, document.querySelector('.map__filters-container'));

  };

  cratePinCard();

  var card = window.map.map.querySelector('.map__card');
  clearCard();

  window.card = {
    card: card,
    clearCard: clearCard
  };

})();
