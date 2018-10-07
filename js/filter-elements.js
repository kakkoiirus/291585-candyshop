'use strict';

(function () {
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

  window.filterElements = {
    getKindFilter: getKindFilter,
    getNutritionFilter: getNutritionFilter,
    getSpecialFilter: getSpecialFilter,
    getSortFilter: getSortFilter
  };
})();
