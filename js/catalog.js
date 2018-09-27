'use strict';

(function () {

  var products;

  var onLoadProductsSuccess = function (productsData) {
    products = productsData;
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

  var getProducts = function () {
    return products;
  };

  window.backend.load(onLoadProductsSuccess);

  window.catalog = {
    getProducts: getProducts
  };
})();
