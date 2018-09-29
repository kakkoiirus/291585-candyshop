'use strict';

(function () {

  var products;

  var kindFilter = [
    {
      id: 'filter-icecream',
      name: 'Мороженое'
    },
    {
      id: 'filter-soda',
      name: 'Газировка'
    },
    {
      id: 'filter-gum',
      name: 'Жевательная резинка'
    },
    {
      id: 'filter-marmalade',
      name: 'Мармелад'
    },
    {
      id: 'filter-marshmallows',
      name: 'Зефир'
    }
  ];

  var nutritionFilter = [
    {
      id: 'filter-sugar-free',
      name: 'sugar'
    },
    {
      id: 'filter-vegetarian',
      name: 'vegetarian'
    },
    {
      id: 'filter-gluten-free',
      name: 'gluten'
    }
  ];

  var specialFilter = [
    {
      id: 'filter-favorite'
    },
    {
      id: 'filter-availability'
    }
  ];

  kindFilter.forEach(function (filter) {
    filter.inputElement = document.querySelector('#' + filter.id);
    filter.countElement = document.querySelector('#' + filter.id + '~ .input-btn__item-count');
  });

  nutritionFilter.forEach(function (filter) {
    filter.inputElement = document.querySelector('#' + filter.id);
    filter.countElement = document.querySelector('#' + filter.id + '~ .input-btn__item-count');
  });

  specialFilter.forEach(function (filter) {
    filter.inputElement = document.querySelector('#' + filter.id);
    filter.countElement = document.querySelector('#' + filter.id + '~ .input-btn__item-count');
  });

  var renderFilterCount = function (productsData) {
    kindFilter.forEach(function (filter) {
      filter.products = productsData.filter(function (product) {
        return product.kind === filter.name;
      });

      filter.countElement.textContent = '(' + filter.products.length + ')';
    });

    nutritionFilter.forEach(function (filter) {
      filter.products = productsData.filter(function (product) {
        return product.nutritionFacts[filter.name] === true;
      });

      filter.countElement.textContent = '(' + filter.products.length + ')';
    });

    specialFilter.forEach(function (filter) {
      filter.products = productsData.filter(function (product) {
        return product.amount > 0;
      });

      filter.countElement.textContent = '(' + filter.products.length + ')';
    });
  };

  var getKindFilter = function () {
    return kindFilter;
  };

  var getNutritionFilter = function () {
    return nutritionFilter;
  };

  var getSpecialFilter = function () {
    return specialFilter;
  };

  var renderProducts = function (productsData) {
    var catalogCards = document.querySelector('.catalog__cards');
    catalogCards.classList.remove('catalog__cards--load');
    catalogCards.innerHTML = '';

    var catalogCardTemplate = document.querySelector('#card').content.querySelector('.catalog__card');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < productsData.length; i++) {
      fragment.appendChild(window.catalogItem.getProductCard(productsData[i], catalogCardTemplate, i));
    }

    catalogCards.appendChild(fragment);
  };

  var onLoadProductsSuccess = function (productsData) {
    products = productsData;
    renderProducts(products);
    renderFilterCount(products);
  };

  var onLoadProductsError = function (message) {
    window.notification.showMessage('error', message);
  };

  var getProducts = function () {
    return products;
  };

  window.backend.load(onLoadProductsSuccess, onLoadProductsError);

  window.catalog = {
    getProducts: getProducts,
    getKindFilter: getKindFilter,
    renderProducts: renderProducts,
    getNutritionFilter: getNutritionFilter,
    getSpecialFilter: getSpecialFilter
  };
})();
