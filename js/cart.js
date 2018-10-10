'use strict';

(function () {
  var EMPTY_CART_MESSAGE = 'В корзине ничего нет';

  var goodsCards = document.querySelector('.goods__cards');
  var goodsCardEmpty = document.querySelector('.goods__card-empty');
  var cartItemTemplate = document.querySelector('#card-order').content.querySelector('.goods_card');
  var mainHeaderBasket = document.querySelector('.main-header__basket');
  var isFirstCartRender = true;

  var getCartItem = function (index, product) {
    var cartItem = cartItemTemplate.cloneNode(true);
    cartItem.querySelector('.card-order__title').textContent = product.name;

    var cartItemImage = cartItem.querySelector('.card-order__img');
    cartItemImage.src = 'img/cards/' + product.picture;
    cartItemImage.alt = product.name;

    cartItem.querySelector('.card-order__price').textContent = product.price + ' ₽';

    cartItem.querySelector('.card-order__count').value = product.count;

    var cartOrderCloseElement = cartItem.querySelector('.card-order__close');
    var cartOrderCount = cartItem.querySelector('.card-order__count');
    var cartOrderDecreaseButton = cartItem.querySelector('.card-order__btn--decrease');
    var cartOrderIncreaseButton = cartItem.querySelector('.card-order__btn--increase');

    var changeCount = function (newCount) {
      var result = window.cartLogic.setItemCount(index, newCount);

      if (!result) {
        renderCart(window.cartLogic.cartProducts);
      } else {
        cartOrderCount.value = result;
        setHeaderBasket();
      }
    };

    cartOrderCloseElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      changeCount(0);
    });

    cartOrderDecreaseButton.addEventListener('click', function () {
      changeCount(+cartOrderCount.value - 1);
    });

    cartOrderIncreaseButton.addEventListener('click', function () {
      changeCount(+cartOrderCount.value + 1);
    });

    cartOrderCount.addEventListener('change', function () {
      changeCount(+cartOrderCount.value);
    });

    return cartItem;
  };

  var renderCart = function (cartItemList) {
    if (isFirstCartRender && cartItemList.length !== 0) {
      goodsCards.classList.remove('goods__cards--empty');
      goodsCardEmpty.classList.add('visually-hidden');
      window.order.enableBuyForm();
      isFirstCartRender = false;
    } else if (cartItemList.length === 0) {
      window.order.setCartStatus(true);
      goodsCards.classList.add('goods__cards--empty');
      goodsCardEmpty.classList.remove('visually-hidden');
      isFirstCartRender = true;
      goodsCards.innerHTML = '';
      goodsCards.appendChild(goodsCardEmpty);
      window.order.disableBuyForm();
    } else {
      goodsCards.innerHTML = '';
    }

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < cartItemList.length; i++) {
      fragment.appendChild(getCartItem(i, cartItemList[i]));
    }

    setHeaderBasket();
    goodsCards.appendChild(fragment);
  };

  var setHeaderBasket = function () {
    var cartCounter = window.cartLogic.getAllItemCount();

    mainHeaderBasket.textContent = cartCounter > 0 ? cartCounter : EMPTY_CART_MESSAGE;
  };

  var catalogCards = document.querySelector('.catalog__cards');

  catalogCards.addEventListener('click', function (evt) {
    evt.preventDefault();

    if (evt.target.classList.contains('card__btn-favorite')) {
      window.catalog.addProductToFavorite(evt);
    } else if (evt.target.classList.contains('card__btn')) {
      window.cartLogic.addToCart(evt.target.dataset.index);
      renderCart(window.cartLogic.cartProducts);
    }
  });
})();
