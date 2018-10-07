'use strict';

(function () {
  var renderFilterCount = function (productsData) {
    window.filterElements.getKindFilter().forEach(function (filter) {
      filter.products = productsData.filter(function (product) {
        return product.kind === filter.name;
      });

      filter.countElement.textContent = '(' + filter.products.length + ')';
    });

    window.filterElements.getNutritionFilter().forEach(function (filter) {
      filter.products = productsData.filter(function (product) {
        return product.nutritionFacts[filter.name] === true;
      });

      filter.countElement.textContent = '(' + filter.products.length + ')';
    });

    window.filterElements.getSpecialFilter().forEach(function (filter) {
      filter.products = productsData.filter(filter.sortingFunc);
      filter.countElement.textContent = '(' + filter.products.length + ')';
    });
  };

  var updateFavoriteFilterCount = function (productsData) {
    window.filterElements.getSpecialFilter()[0].products = productsData.filter(window.filterElements.getSpecialFilter()[0].sortingFunc);
    window.filterElements.getSpecialFilter()[0].countElement.textContent = '(' + window.filterElements.getSpecialFilter()[0].products.length + ')';
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

    if (window.filterElements.getSpecialFilter()[1].inputElement.checked) {
      products = window.filterElements.getSpecialFilter()[1].products;
    } else if (window.filterElements.getSpecialFilter()[0].inputElement.checked) {
      products = window.catalog.getProducts().filter(window.filterElements.getSpecialFilter()[0].sortingFunc);
    } else {
      window.filterElements.getKindFilter().forEach(function (filter) {
        if (filter.inputElement.checked) {
          checkedCount++;
          products = products.concat(filter.products);
        }
      });

      if (!checkedCount && products.length === 0) {
        products = window.catalog.getProducts();
      }

      window.filterElements.getNutritionFilter().forEach(function (filter) {
        if (filter.inputElement.checked) {
          products = products.filter(function (product) {
            return product.nutritionFacts[filter.name] === true;
          });
        }
      });
    }

    products = products.filter(function (product) {
      return product.price >= Number(rangePriceMin.textContent) &&
             product.price <= Number(rangePriceMax.textContent);
    });

    window.filterElements.getSortFilter().forEach(function (filter) {
      if (filter.inputElement.checked) {
        products = filter.sortingFunc(products);
      }
    });

    window.catalog.renderProducts(products);
  };

  var uncheckFilters = function (activeSpecialFilter) {
    window.filterElements.getKindFilter().forEach(function (filter) {
      filter.inputElement.checked = false;
    });

    window.filterElements.getNutritionFilter().forEach(function (filter) {
      filter.inputElement.checked = false;
    });

    window.filterElements.getSpecialFilter().forEach(function (filter) {
      if (filter.id !== activeSpecialFilter) {
        filter.inputElement.checked = false;
      }
    });
  };

  var uncheckSpecialFilters = function () {
    window.filterElements.getSpecialFilter().forEach(function (filter) {
      filter.inputElement.checked = false;
    });
  };

  var setInitialSortFilter = function () {
    window.filterElements.getSortFilter()[0].inputElement.checked = true;
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
