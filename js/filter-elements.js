'use strict';

(function () {
  var kindFilter = {
    'filter-icecream': {
      name: 'Мороженое'
    },
    'filter-soda': {
      name: 'Газировка'
    },
    'filter-gum': {
      name: 'Жевательная резинка'
    },
    'filter-marmalade': {
      name: 'Мармелад'
    },
    'filter-marshmallows': {
      id: 'filter-marshmallows',
    }
  };

  var nutritionFilter = {
    'filter-sugar-free': {
      name: 'sugar'
    },
    'filter-vegetarian': {
      name: 'vegetarian'
    },
    'filter-gluten-free': {
      name: 'gluten'
    }
  };

  var specialFilter = {
    'filter-favorite': {
      sortingFunc: function (product) {
        return product.favorite === true;
      }
    },
    'filter-availability': {
      sortingFunc: function (product) {
        return product.amount > 0;
      }
    }
  };

  var sortFilter = {
    'filter-popular': {
      sortingFunc: function (unsortedProducts) {
        return unsortedProducts;
      }
    },
    'filter-expensive': {
      sortingFunc: function (unsortedProducts) {
        var sortedProducts = unsortedProducts.slice();

        sortedProducts.sort(function (a, b) {
          return b.price - a.price;
        });

        return sortedProducts;
      }
    },
    'filter-cheep': {
      sortingFunc: function (unsortedProducts) {
        var sortedProducts = unsortedProducts.slice();

        sortedProducts.sort(function (a, b) {
          return a.price - b.price;
        });

        return sortedProducts;
      }
    },
    'filter-rating': {
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
  };

  for (var kindElement in kindFilter) {
    if (kindFilter.hasOwnProperty(kindElement)) {
      kindFilter[kindElement].inputElement = document.querySelector('#' + kindElement);
      kindFilter[kindElement].countElement = document.querySelector('#' + kindElement + '~ .input-btn__item-count');
    }
  }

  for (var nutritionElement in nutritionFilter) {
    if (nutritionFilter.hasOwnProperty(nutritionElement)) {
      nutritionFilter[nutritionElement].inputElement = document.querySelector('#' + nutritionElement);
      nutritionFilter[nutritionElement].countElement = document.querySelector('#' + nutritionElement + '~ .input-btn__item-count');
    }
  }

  for (var specialElement in specialFilter) {
    if (specialFilter.hasOwnProperty(specialElement)) {
      specialFilter[specialElement].inputElement = document.querySelector('#' + specialElement);
      specialFilter[specialElement].countElement = document.querySelector('#' + specialElement + '~ .input-btn__item-count');
    }
  }

  for (var sortElement in sortFilter) {
    if (sortFilter.hasOwnProperty(sortElement)) {
      sortFilter[sortElement].inputElement = document.querySelector('#' + sortElement);
    }
  }

  window.filterElements = {
    kindFilter: kindFilter,
    nutritionFilter: nutritionFilter,
    specialFilter: specialFilter,
    sortFilter: sortFilter
  };
})();
