'use strict';

(function () {
  var EMPTY_CART_MESSAGE = 'В корзине ничего нет';
  var CURRENCY_SYMBOL = ' ₽';

  var goodsCards = document.querySelector('.goods__cards');
  var goodsCardEmpty = document.querySelector('.goods__card-empty');
  var cartItemTemplate = document.querySelector('#card-order').content.querySelector('.goods_card');
  var mainHeaderBasket = document.querySelector('.main-header__basket');
  var goodsTotal = document.querySelector('.goods__total');
  var goodsTotalQuantity = goodsTotal.querySelector('.goods__total-quantity');
  var goodsTotalPrice = goodsTotal.querySelector('.goods__price');

  var isFirstCartRender = true;

  var getCartItem = function (index, product) {
    var cartItem = cartItemTemplate.cloneNode(true);
    cartItem.querySelector('.card-order__title').textContent = product.name;

    var cartItemImage = cartItem.querySelector('.card-order__img');
    cartItemImage.src = 'img/cards/' + product.picture;
    cartItemImage.alt = product.name;

    cartItem.querySelector('.card-order__price').textContent = product.price + CURRENCY_SYMBOL;

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
        var cartCounter = window.cartLogic.getAllItemCount();
        setHeaderBasket(cartCounter);
        setCartTotal(cartCounter);
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
      goodsTotal.classList.remove('visually-hidden');
      window.order.enableBuyForm();
      isFirstCartRender = false;
    } else if (cartItemList.length === 0) {
      window.order.setCartStatus(true);
      goodsCards.classList.add('goods__cards--empty');
      goodsCardEmpty.classList.remove('visually-hidden');
      goodsTotal.classList.add('visually-hidden');
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

    var cartCounter = window.cartLogic.getAllItemCount();

    setHeaderBasket(cartCounter);
    setCartTotal(cartCounter);
    goodsCards.appendChild(fragment);
  };

  var setCartTotal = function (count) {
    goodsTotalQuantity.textContent = count;
    goodsTotalPrice.textContent = window.cartLogic.getAllItemSum() + CURRENCY_SYMBOL;
  };

  var setHeaderBasket = function (count) {
    mainHeaderBasket.textContent = count > 0 ? count : EMPTY_CART_MESSAGE;
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
