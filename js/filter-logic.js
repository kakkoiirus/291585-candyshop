'use strict';

(function () {
  var renderFilterCount = function (productsData) {
    for (var kindElement in window.filterElements.kindFilter) {
      if (window.filterElements.kindFilter.hasOwnProperty(kindElement)) {
        var kindFilter = window.filterElements.kindFilter[kindElement];
        kindFilter.products = productsData.filter(function (product) {
          return product.kind === kindFilter.name;
        });

        kindFilter.countElement.textContent = '(' + kindFilter.products.length + ')';
      }
    }

    for (var nutritionElement in window.filterElements.nutritionFilter) {
      if (window.filterElements.nutritionFilter.hasOwnProperty(nutritionElement)) {
        var nutritionFilter = window.filterElements.nutritionFilter[nutritionElement];

        nutritionFilter.products = productsData.filter(function (product) {
          return product.nutritionFacts[nutritionFilter.name] === true;
        });

        nutritionFilter.countElement.textContent = '(' + nutritionFilter.products.length + ')';
      }
    }

    for (var specialElement in window.filterElements.specialFilter) {
      if (window.filterElements.specialFilter.hasOwnProperty(specialElement)) {
        var specialFilter = window.filterElements.specialFilter[specialElement];

        specialFilter.products = productsData.filter(specialFilter.sortingFunc);
        specialFilter.countElement.textContent = '(' + specialFilter.products.length + ')';
      }
    }
  };

  var updateFavoriteFilterCount = function (productsData) {
    window.filterElements.specialFilter['filter-favorite'].products = productsData.filter(window.filterElements.specialFilter['filter-favorite'].sortingFunc);
    window.filterElements.specialFilter['filter-favorite'].countElement.textContent = '(' + window.filterElements.specialFilter['filter-favorite'].products.length + ')';
  };

  var catalogFilter = document.querySelector('.catalog__filter + .range');
  var rangeFilter = catalogFilter.querySelector('.range__filter');
  var rangeLine = rangeFilter.querySelector('.range__fill-line');
  var rangeButtonLeft = rangeFilter.querySelector('.range__btn--left');
  var rangeButtonRight = rangeFilter.querySelector('.range__btn--right');
  var rangePriceMin = catalogFilter.querySelector('.range__price--min');
  var rangePriceMax = catalogFilter.querySelector('.range__price--max');
  var buttonWidth = rangeButtonLeft.offsetWidth;

  var onFormChange = function () {
    var products = [];
    var checkedCount = 0;

    if (window.filterElements.specialFilter['filter-availability'].inputElement.checked) {
      products = window.filterElements.specialFilter['filter-availability'].products;
    } else if (window.filterElements.specialFilter['filter-favorite'].inputElement.checked) {
      products = window.catalog.getProducts().filter(window.filterElements.specialFilter['filter-favorite'].sortingFunc);
    } else {
      for (var kindElement in window.filterElements.kindFilter) {
        if (window.filterElements.kindFilter.hasOwnProperty(kindElement)) {
          var kindFilter = window.filterElements.kindFilter[kindElement];

          if (kindFilter.inputElement.checked) {
            checkedCount++;
            products = products.concat(kindFilter.products);
          }
        }
      }

      if (!checkedCount && products.length === 0) {
        products = window.catalog.getProducts();
      }

      for (var nutritionElement in window.filterElements.nutritionFilter) {
        if (window.filterElements.nutritionFilter.hasOwnProperty(nutritionElement)) {
          var nutritionFilter = window.filterElements.nutritionFilter[nutritionElement];

          if (nutritionFilter.inputElement.checked) {
            products = products.filter(function (product) {
              return product.nutritionFacts[nutritionFilter.name] === true;
            });
          }
        }
      }
    }

    products = products.filter(function (product) {
      return product.price >= Number(rangePriceMin.textContent) &&
             product.price <= Number(rangePriceMax.textContent);
    });

    for (var sortElement in window.filterElements.sortFilter) {
      if (window.filterElements.sortFilter.hasOwnProperty(sortElement)) {

        if (window.filterElements.sortFilter[sortElement].inputElement.checked) {
          products = window.filterElements.sortFilter[sortElement].sortingFunc(products);
        }
      }
    }

    window.catalog.renderProducts(products);
  };

  var uncheckFilters = function (activeSpecialFilter) {
    for (var kindElement in window.filterElements.kindFilter) {
      if (window.filterElements.kindFilter.hasOwnProperty(kindElement)) {
        window.filterElements.kindFilter[kindElement].inputElement.checked = false;
      }
    }

    for (var nutritionElement in window.filterElements.nutritionFilter) {
      if (window.filterElements.nutritionFilter.hasOwnProperty(nutritionElement)) {
        window.filterElements.nutritionFilter[nutritionElement].inputElement.checked = false;
      }
    }

    for (var specialElement in window.filterElements.specialFilter) {
      if (window.filterElements.specialFilter.hasOwnProperty(specialElement)) {

        if (specialElement !== activeSpecialFilter) {
          window.filterElements.specialFilter[specialElement].inputElement.checked = false;
        }
      }
    }
  };

  var uncheckSpecialFilters = function () {
    for (var specialElement in window.filterElements.specialFilter) {
      if (window.filterElements.specialFilter.hasOwnProperty(specialElement)) {
        window.filterElements.specialFilter[specialElement].inputElement.checked = false;
      }
    }
  };

  var setInitialSortFilter = function () {
    window.filterElements.sortFilter['filter-popular'].inputElement.checked = true;
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
