'use strict';

(function () {
  var cartProducts = [];

  var addToCart = function (productIndex) {
    var productItem = window.catalog.products[productIndex];

    if (productItem.amount > 0) {
      window.order.setCartStatus(false);
      var itemInCartCount = 1;

      for (var i = 0; i < cartProducts.length; i++) {
        if (cartProducts[i].index === productIndex) {
          itemInCartCount = setItemCount(i, cartProducts[i].count + 1);
        }
      }

      if (itemInCartCount === 1) {
        var cartItem = {
          name: productItem.name,
          price: productItem.price,
          picture: productItem.picture,
          count: 1,
          maxAmount: productItem.amount,
          index: productIndex
        };

        cartProducts.push(cartItem);
      }
    }
  };

  var removeFromCart = function (index) {
    cartProducts.splice(index, 1);
  };

  var setItemCount = function (itemIndex, itemCount) {
    if (itemCount === 0) {
      removeFromCart(itemIndex);
    } else if (itemCount > cartProducts[itemIndex].maxAmount) {
      cartProducts[itemIndex].count = cartProducts[itemIndex].maxAmount;
    } else {
      cartProducts[itemIndex].count = itemCount;
    }

    return itemCount < 1 ? 0 : cartProducts[itemIndex].count;
  };

  var getAllItemCount = function () {
    var result = 0;

    for (var i = 0; i < cartProducts.length; i++) {
      result += cartProducts[i].count;
    }

    return result;
  };

  window.cartLogic = {
    cartProducts: cartProducts,
    addToCart: addToCart,
    setItemCount: setItemCount,
    getAllItemCount: getAllItemCount
  };
})();
