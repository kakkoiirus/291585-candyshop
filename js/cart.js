'use strict';

(function () {
  var CART_MESSAGE = 'В корзине ничего нет';
  var cartProducts = [];

  var goodsCards = document.querySelector('.goods__cards');
  var goodsCardEmpty = document.querySelector('.goods__card-empty');
  var cartItemTemplate = document.querySelector('#card-order').content.querySelector('.goods_card');
  var mainHeaderBasket = document.querySelector('.main-header__basket');
  var isFirstCartRender = true;

  var renderCart = function (cartItemList) {
    var cartCounter = 0;

    if (isFirstCartRender && cartItemList.length !== 0) {
      goodsCards.classList.remove('goods__cards--empty');
      goodsCardEmpty.classList.add('visually-hidden');
      window.order.enableBuyForm();
      isFirstCartRender = false;
    } else {
      goodsCards.innerHTML = '';
    }

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < cartItemList.length; i++) {
      cartCounter += cartItemList[i].count;
      fragment.appendChild(window.cartItem.getCartItem(cartItemList[i], cartItemTemplate));
    }

    if (cartCounter > 0) {
      mainHeaderBasket.textContent = cartCounter;
    } else {
      mainHeaderBasket.textContent = CART_MESSAGE;
      window.order.disableBuyForm();
    }

    goodsCards.appendChild(fragment);

    var cartOrderCloseElements = goodsCards.querySelectorAll('.card-order__close');
    var cartOrderCount = goodsCards.querySelectorAll('.card-order__count');
    var cartOrderDecreaseButtons = goodsCards.querySelectorAll('.card-order__btn--decrease');
    var cartOrderIncreaseButtons = goodsCards.querySelectorAll('.card-order__btn--increase');

    for (var j = 0; j < cartOrderCloseElements.length; j++) {
      (function (index) {
        cartOrderCloseElements[index].addEventListener('click', function (evt) {
          evt.preventDefault();
          removeFromCart(index);
        });
      })(j);
    }

    for (var k = 0; k < cartOrderDecreaseButtons.length; k++) {
      (function (index) {
        cartOrderDecreaseButtons[index].addEventListener('click', function () {
          cartProducts[index].count--;

          if (cartProducts[index].count === 0) {
            removeFromCart(index);
          } else {
            cartOrderCount[index].value = cartProducts[index].count;
          }
        });
      })(k);
    }

    for (var l = 0; l < cartOrderIncreaseButtons.length; l++) {
      (function (index) {
        cartOrderIncreaseButtons[index].addEventListener('click', function () {
          var currentProduct = window.catalog.products[cartProducts[index].index];

          if (currentProduct.amount > cartProducts[index].count) {
            cartProducts[index].count++;
            cartOrderCount[index].value = cartProducts[index].count;
          }
        });
      })(l);
    }

    for (var m = 0; m < cartOrderCount.length; m++) {
      (function (index) {
        cartOrderCount[index].addEventListener('change', function () {
          var currentProduct = window.catalog.products[cartProducts[index].index];

          if (currentProduct.amount < +cartOrderCount[index].value) {
            cartOrderCount[index].value = currentProduct.amount;
          }

          cartProducts[index].count = +cartOrderCount[index].value;

          if (cartProducts[index].count === 0) {
            removeFromCart(index);
          }
        });
      })(m);
    }
  };

  var addToFavorite = function (evt) {
    evt.target.classList.toggle('card__btn-favorite--selected');
  };

  var addToCart = function (evt) {
    var productIndex = evt.target.dataset.index;
    var productItem = window.catalog.products[productIndex];

    if (productItem.amount > 0) {
      window.order.setCartStatus(false);
      var isItemInCart = false;

      for (var i = 0; i < cartProducts.length; i++) {
        if (cartProducts[i].index === productIndex) {
          isItemInCart = true;

          if (productItem.amount > cartProducts[i].count) {
            cartProducts[i].count++;
          }
        }
      }

      if (!isItemInCart) {
        var cartItem = {
          name: productItem.name,
          price: productItem.price,
          picture: productItem.picture,
          count: 1,
          index: productIndex
        };

        cartProducts.push(cartItem);
      }

      renderCart(cartProducts);
    }
  };

  var removeFromCart = function (index) {
    cartProducts.splice(index, 1);
    renderCart(cartProducts);

    if (!cartProducts.length) {
      window.order.setCartStatus(true);
      goodsCards.classList.add('goods__cards--empty');
      goodsCardEmpty.classList.remove('visually-hidden');
      isFirstCartRender = true;
      goodsCards.appendChild(goodsCardEmpty);
    }
  };

  var catalogCards = document.querySelector('.catalog__cards');

  catalogCards.addEventListener('click', function (evt) {
    evt.preventDefault();

    if (evt.target.classList.contains('card__btn-favorite')) {
      addToFavorite(evt);
    } else if (evt.target.classList.contains('card__btn')) {
      addToCart(evt);
    }
  });
})();
