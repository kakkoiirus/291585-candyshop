'use strict';

(function () {
  var renderFilterCount = function (productsData) {
    for (var kindElement in window.filterElements.KindFilter) {
      if (window.filterElements.KindFilter.hasOwnProperty(kindElement)) {
        var KindFilter = window.filterElements.KindFilter[kindElement];
        KindFilter.products = productsData.filter(function (product) {
          return product.kind === KindFilter.name;
        });

        KindFilter.countElement.textContent = '(' + KindFilter.products.length + ')';
      }
    }

    for (var nutritionElement in window.filterElements.NutritionFilter) {
      if (window.filterElements.NutritionFilter.hasOwnProperty(nutritionElement)) {
        var NutritionFilter = window.filterElements.NutritionFilter[nutritionElement];

        NutritionFilter.products = productsData.filter(function (product) {
          return product.nutritionFacts[NutritionFilter.name] === true;
        });

        NutritionFilter.countElement.textContent = '(' + NutritionFilter.products.length + ')';
      }
    }

    for (var specialElement in window.filterElements.SpecialFilter) {
      if (window.filterElements.SpecialFilter.hasOwnProperty(specialElement)) {
        var SpecialFilter = window.filterElements.SpecialFilter[specialElement];

        SpecialFilter.products = productsData.filter(SpecialFilter.sortingFunc);
        SpecialFilter.countElement.textContent = '(' + SpecialFilter.products.length + ')';
      }
    }
  };

  var updateFavoriteFilterCount = function (productsData) {
    window.filterElements.SpecialFilter['filter-favorite'].products = productsData.filter(window.filterElements.SpecialFilter['filter-favorite'].sortingFunc);
    window.filterElements.SpecialFilter['filter-favorite'].countElement.textContent = '(' + window.filterElements.SpecialFilter['filter-favorite'].products.length + ')';
  };

  var catalogFilter = document.querySelector('.catalog__filter + .range');
  var rangeFilter = catalogFilter.querySelector('.range__filter');
  var rangeLine = rangeFilter.querySelector('.range__fill-line');
  var rangeButtonLeft = rangeFilter.querySelector('.range__btn--left');
  var rangeButtonRight = rangeFilter.querySelector('.range__btn--right');
  var rangePriceMin = catalogFilter.querySelector('.range__price--min');
  var rangePriceMax = catalogFilter.querySelector('.range__price--max');
  var buttonWidth = rangeButtonLeft.offsetWidth;

  var onFormChange = window.debounce(function () {
    var products = [];
    var checkedCount = 0;

    if (window.filterElements.SpecialFilter['filter-availability'].inputElement.checked) {
      products = window.filterElements.SpecialFilter['filter-availability'].products;
    } else if (window.filterElements.SpecialFilter['filter-favorite'].inputElement.checked) {
      products = window.catalog.getProducts().filter(window.filterElements.SpecialFilter['filter-favorite'].sortingFunc);
    } else {
      for (var kindElement in window.filterElements.KindFilter) {
        if (window.filterElements.KindFilter.hasOwnProperty(kindElement)) {
          var KindFilter = window.filterElements.KindFilter[kindElement];

          if (KindFilter.inputElement.checked) {
            checkedCount++;
            products = products.concat(KindFilter.products);
          }
        }
      }

      if (!checkedCount && products.length === 0) {
        products = window.catalog.getProducts();
      }

      for (var nutritionElement in window.filterElements.NutritionFilter) {
        if (window.filterElements.NutritionFilter.hasOwnProperty(nutritionElement)) {
          var NutritionFilter = window.filterElements.NutritionFilter[nutritionElement];

          if (NutritionFilter.inputElement.checked) {
            products = products.filter(function (product) {
              return product.nutritionFacts[NutritionFilter.name] === true;
            });
          }
        }
      }
    }

    products = products.filter(function (product) {
      return product.price >= Number(rangePriceMin.textContent) &&
             product.price <= Number(rangePriceMax.textContent);
    });

    for (var sortElement in window.filterElements.SortFilter) {
      if (window.filterElements.SortFilter.hasOwnProperty(sortElement)) {

        if (window.filterElements.SortFilter[sortElement].inputElement.checked) {
          products = window.filterElements.SortFilter[sortElement].sortingFunc(products);
        }
      }
    }

    window.catalog.renderProducts(products);
  });

  var uncheckFilters = function (activeSpecialFilter) {
    for (var kindElement in window.filterElements.KindFilter) {
      if (window.filterElements.KindFilter.hasOwnProperty(kindElement)) {
        window.filterElements.KindFilter[kindElement].inputElement.checked = false;
      }
    }

    for (var nutritionElement in window.filterElements.NutritionFilter) {
      if (window.filterElements.NutritionFilter.hasOwnProperty(nutritionElement)) {
        window.filterElements.NutritionFilter[nutritionElement].inputElement.checked = false;
      }
    }

    for (var specialElement in window.filterElements.SpecialFilter) {
      if (window.filterElements.SpecialFilter.hasOwnProperty(specialElement)) {

        if (specialElement !== activeSpecialFilter) {
          window.filterElements.SpecialFilter[specialElement].inputElement.checked = false;
        }
      }
    }
  };

  var uncheckSpecialFilters = function () {
    for (var specialElement in window.filterElements.SpecialFilter) {
      if (window.filterElements.SpecialFilter.hasOwnProperty(specialElement)) {
        window.filterElements.SpecialFilter[specialElement].inputElement.checked = false;
      }
    }
  };

  var setInitialSortFilter = function () {
    window.filterElements.SortFilter['filter-popular'].inputElement.checked = true;
  };

  var setInitialRange = function () {
    rangeButtonLeft.style.left = '0px';
    rangeButtonRight.style.left = (rangeFilter.offsetWidth - buttonWidth) + 'px';
    setMinPrice();
    setMaxPrice();
  };

  var setMinPrice = function () {
    rangePriceMin.textContent = Math.round((rangeButtonLeft.offsetLeft) * window.catalog.getMaxPrice() / (rangeFilter.offsetWidth - buttonWidth));
    rangeLine.style.left = rangeButtonLeft.offsetLeft + 'px';
  };

  var setMaxPrice = function () {
    rangePriceMax.textContent = Math.round((rangeButtonRight.offsetLeft) * window.catalog.getMaxPrice() / (rangeFilter.offsetWidth - buttonWidth));
    rangeLine.style.right = (rangeFilter.offsetWidth - rangeButtonRight.offsetLeft - buttonWidth) + 'px';
  };

  window.filterLogic = {
    onFormChange: onFormChange,
    rangeButtonLeft: rangeButtonLeft,
    rangeButtonRight: rangeButtonRight,
    buttonWidth: buttonWidth,
    rangeFilter: rangeFilter,
    renderFilterCount: renderFilterCount,
    updateFavoriteFilterCount: updateFavoriteFilterCount,
    uncheckFilters: uncheckFilters,
    uncheckSpecialFilters: uncheckSpecialFilters,
    setInitialSortFilter: setInitialSortFilter,
    setInitialRange: setInitialRange,
    setMinPrice: setMinPrice,
    setMaxPrice: setMaxPrice
  };
})();
