'use strict';

(function () {
  var getCartItem = function (product, cartItemTemplate) {
    var cartItem = cartItemTemplate.cloneNode(true);
    cartItem.querySelector('.card-order__title').textContent = product.name;

    var cartItemImage = cartItem.querySelector('.card-order__img');
    cartItemImage.src = product.picture;
    cartItemImage.alt = product.name;

    cartItem.querySelector('.card-order__price').textContent = product.price + ' ₽';

    cartItem.querySelector('.card-order__count').value = product.count;

    return cartItem;
  };

  window.cartItem = {
    getCartItem: getCartItem
  };
})();
