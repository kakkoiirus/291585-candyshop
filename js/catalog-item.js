'use strict';

(function () {
  var Ratings = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five'
  };

  var getProductCard = function (product, catalogCardTemplate) {
    var catalogCard = catalogCardTemplate.cloneNode(true);

    if (product.amount > 5) {
      catalogCard.classList.add('card--in-stock');
    } else if (product.amount <= 5 && product.amount >= 1) {
      catalogCard.classList.add('card--little');
    } else if (product.amount === 0) {
      catalogCard.classList.add('card--soon');
    }

    catalogCard.querySelector('.card__title').textContent = product.name;
    catalogCard.querySelector('.card__price').innerHTML = product.price + ' <span class="card__currency">₽</span><span class="card__weight">/ ' + product.weight + ' Г</span>';

    var productImage = catalogCard.querySelector('.card__img');
    productImage.src = 'img/cards/' + product.picture;
    productImage.alt = product.name;
    var productRating = catalogCard.querySelector('.stars__rating');

    if (product.rating.value < 5) {
      productRating.classList.remove('stars__rating--five');
      productRating.classList.add('stars__rating--' + Ratings[product.rating.value]);

      productRating.textContent = product.rating.value > 1 ? 'Рейтинг: ' + product.rating.value + ' звёзды' : 'Рейтинг: ' + product.rating.value + ' звёзда';
    }

    catalogCard.querySelector('.star__count').textContent = product.rating.number;

    var cardCharacteristic = product.nutritionFacts.sugar ? 'Содержит сахар. ' : 'Без сахара. ';

    cardCharacteristic += product.nutritionFacts.energy + ' ккал';
    catalogCard.querySelector('.card__characteristic').textContent = cardCharacteristic;
    catalogCard.querySelector('.card__composition-list').textContent = product.nutritionFacts.contents;

    catalogCard.querySelector('.card__btn').dataset.index = product.index;
    var cardButtonFavorite = catalogCard.querySelector('.card__btn-favorite');
    cardButtonFavorite.dataset.index = product.index;

    if (product.favorite) {
      cardButtonFavorite.classList.add('card__btn-favorite--selected');
    }

    return catalogCard;
  };

  window.catalogItem = {
    getProductCard: getProductCard
  };
})();
