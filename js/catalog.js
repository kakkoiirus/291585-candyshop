'use strict';

(function () {

  var products;
  var minPrice;
  var maxPrice;

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
      id: 'filter-favorite',
      sortingFunc: function (product) {
        return product.favorite === true;
      }
    },
    {
      id: 'filter-availability',
      sortingFunc: function (product) {
        return product.amount > 0;
      }
    }
  ];

  var sortFilter = [
    {
      id: 'filter-popular',
      sortingFunc: function (unsortedProducts) {
        return unsortedProducts;
      }
    },
    {
      id: 'filter-expensive',
      sortingFunc: function (unsortedProducts) {
        var sortedProducts = unsortedProducts.slice();

        sortedProducts.sort(function (a, b) {
          return b.price - a.price;
        });

        return sortedProducts;
      }
    },
    {
      id: 'filter-cheep',
      sortingFunc: function (unsortedProducts) {
        var sortedProducts = unsortedProducts.slice();

        sortedProducts.sort(function (a, b) {
          return a.price - b.price;
        });

        return sortedProducts;
      }
    },
    {
      id: 'filter-rating',
      sortingFunc: function (unsortedProducts) {
        var sortedProducts = unsortedProducts.slice();

        sortedProducts.sort(function (a, b) {
          if (a.rating.value !== b.rating.value) {
            return b.rating.value - a.rating.value;
          }

          return b.rating.number - a.rating.number;
        });

        return sortedProducts;
      }
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

  sortFilter.forEach(function (filter) {
    filter.inputElement = document.querySelector('#' + filter.id);
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
      filter.products = productsData.filter(filter.sortingFunc);
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

  var getSortFilter = function () {
    return sortFilter;
  };

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

    var catalogCardTemplate = document.querySelector('#card').content.querySelector('.catalog__card');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < productsData.length; i++) {
      fragment.appendChild(window.catalogItem.getProductCard(productsData[i], catalogCardTemplate, i));
    }

    catalogCards.appendChild(fragment);
  };

  var onLoadProductsSuccess = function (productsData) {
    products = productsData;
    setMinMaxPrices();
    renderProducts(products);
    renderFilterCount(products);
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

  var addProductToFavorite = function (id) {
    products[id].favorite = products[id].favorite ? false : true;
  };

  window.backend.load(onLoadProductsSuccess, onLoadProductsError);

  window.catalog = {
    getProducts: getProducts,
    getMinPrice: getMinPrice,
    getMaxPrice: getMaxPrice,
    addProductToFavorite: addProductToFavorite,
    getKindFilter: getKindFilter,
    renderProducts: renderProducts,
    getNutritionFilter: getNutritionFilter,
    getSpecialFilter: getSpecialFilter,
    getSortFilter: getSortFilter
  };
})();
