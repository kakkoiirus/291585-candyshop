'use strict';

(function () {
  var KindFilter = {
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

  var NutritionFilter = {
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

  var SpecialFilter = {
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

  var SortFilter = {
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

  for (var kindElement in KindFilter) {
    if (KindFilter.hasOwnProperty(kindElement)) {
      KindFilter[kindElement].inputElement = document.querySelector('#' + kindElement);
      KindFilter[kindElement].countElement = document.querySelector('#' + kindElement + '~ .input-btn__item-count');
    }
  }

  for (var nutritionElement in NutritionFilter) {
    if (NutritionFilter.hasOwnProperty(nutritionElement)) {
      NutritionFilter[nutritionElement].inputElement = document.querySelector('#' + nutritionElement);
      NutritionFilter[nutritionElement].countElement = document.querySelector('#' + nutritionElement + '~ .input-btn__item-count');
    }
  }

  for (var specialElement in SpecialFilter) {
    if (SpecialFilter.hasOwnProperty(specialElement)) {
      SpecialFilter[specialElement].inputElement = document.querySelector('#' + specialElement);
      SpecialFilter[specialElement].countElement = document.querySelector('#' + specialElement + '~ .input-btn__item-count');
    }
  }

  for (var sortElement in SortFilter) {
    if (SortFilter.hasOwnProperty(sortElement)) {
      SortFilter[sortElement].inputElement = document.querySelector('#' + sortElement);
    }
  }

  window.filterElements = {
    KindFilter: KindFilter,
    NutritionFilter: NutritionFilter,
    SpecialFilter: SpecialFilter,
    SortFilter: SortFilter
  };
})();
