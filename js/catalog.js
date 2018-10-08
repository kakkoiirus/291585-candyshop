'use strict';

(function () {
  var products;
  var minPrice;
  var maxPrice;

  var setMinMaxPrices = function () {
    minPrice = products.reduce(function (minValue, currentValue) {
      return minValue > currentValue.price ? currentValue.price : minValue;
    }, 0);
    maxPrice = products.reduce(function (maxValue, currentValue) {
      return maxValue < currentValue.price ? currentValue.price : maxValue;
    }, 0);
  };

  var renderProducts = function (productsData) {
    var catalogCards = document.querySelector('.catalog__cards');
    catalogCards.classList.remove('catalog__cards--load');
    catalogCards.innerHTML = '';

    if (productsData.length === 0) {
      var emptyFiltersTemplate = document.querySelector('#empty-filters').content.querySelector('.catalog__empty-filter');
      var emptyFiltersMessage = emptyFiltersTemplate.cloneNode(true);

      catalogCards.appendChild(emptyFiltersMessage);
    } else {
      var catalogCardTemplate = document.querySelector('#card').content.querySelector('.catalog__card');
      var fragment = document.createDocumentFragment();

      productsData.forEach(function (product) {
        fragment.appendChild(window.catalogItem.getProductCard(product, catalogCardTemplate));
      });

      catalogCards.appendChild(fragment);
    }
  };

  var onLoadProductsSuccess = function (productsData) {
    products = productsData;

    products.forEach(function (product, index) {
      product.index = index;
    });

    setMinMaxPrices();
    window.filterLogic.setInitialRange();
    renderProducts(products);
    window.filterLogic.renderFilterCount(products);
  };

  var onLoadProductsError = function (message) {
    window.notification.showMessage('error', message);
  };

  var getProducts = function () {
    return products;
  };

  var getMinPrice = function () {
    return minPrice;
  };

  var getMaxPrice = function () {
    return maxPrice;
  };

  var addProductToFavorite = function (evt) {
    var id = evt.target.dataset.index;

    products[id].favorite = products[id].favorite ? false : true;
    evt.target.classList.toggle('card__btn-favorite--selected');
    window.filterLogic.updateFavoriteFilterCount(products);
  };

  window.backend.load(onLoadProductsSuccess, onLoadProductsError);

  window.catalog = {
    getProducts: getProducts,
    getMinPrice: getMinPrice,
    getMaxPrice: getMaxPrice,
    addProductToFavorite: addProductToFavorite,
    renderProducts: renderProducts,
  };
})();
