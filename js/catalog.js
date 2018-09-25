'use strict';

(function () {

  var PRODUCTS_COUNT = 26;

  var products = window.data.getProducts(PRODUCTS_COUNT);

  var renderProductCards = function () {
    var catalogCards = document.querySelector('.catalog__cards');
    catalogCards.classList.remove('catalog__cards--load');

    var catalogLoad = document.querySelector('.catalog__load');
    catalogLoad.classList.add('visually-hidden');

    var catalogCardTemplate = document.querySelector('#card').content.querySelector('.catalog__card');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < products.length; i++) {
      fragment.appendChild(window.catalogItem.getProductCard(products[i], catalogCardTemplate, i));
    }

    catalogCards.appendChild(fragment);
  };

  renderProductCards(products);

  window.catalog = {
    products: products
  };
})();
