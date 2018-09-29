'use strict';

(function () {
  var filterForm = document.querySelector('.catalog__sidebar form');
  var catalogFilter = document.querySelector('.catalog__filter + .range');
  var rangeFilter = catalogFilter.querySelector('.range__filter');
  var rangeLine = rangeFilter.querySelector('.range__fill-line');
  var rangeButtonLeft = rangeFilter.querySelector('.range__btn--left');
  var rangeButtonRight = rangeFilter.querySelector('.range__btn--right');
  var rangePriceMin = catalogFilter.querySelector('.range__price--min');
  var rangePriceMax = catalogFilter.querySelector('.range__price--max');
  var buttonWidth = rangeButtonLeft.offsetWidth;
  var leftButtonX = rangeButtonLeft.offsetLeft;
  var rightButtonX = rangeButtonRight.offsetLeft;

  var uncheckFilters = function (activeSpecialFilter) {
    window.catalog.getKindFilter().forEach(function (filter) {
      filter.inputElement.checked = false;
    });

    window.catalog.getNutritionFilter().forEach(function (filter) {
      filter.inputElement.checked = false;
    });

    window.catalog.getSpecialFilter().forEach(function (filter) {
      if (filter.id !== activeSpecialFilter) {
        filter.inputElement.checked = false;
      }
    });
  };

  var uncheckSpecialFilters = function () {
    window.catalog.getSpecialFilter().forEach(function (filter) {
      filter.inputElement.checked = false;
    });
  };

  var onFormChange = function (evt) {
    var products = [];
    var checkedCount = 0;

    if (evt.target.id === 'filter-availability') {
      uncheckFilters(evt.target.id);
      products = window.catalog.getSpecialFilter()[1].products;
    } else if (evt.target.id === 'filter-favorite') {
      uncheckFilters(evt.target.id);
    } else {
      uncheckSpecialFilters();

      window.catalog.getKindFilter().forEach(function (filter) {
        if (filter.inputElement.checked) {
          checkedCount++;
          products = products.concat(filter.products);
        }
      });

      if (!checkedCount && products.length === 0) {
        products = window.catalog.getProducts();
      }

      window.catalog.getNutritionFilter().forEach(function (filter) {
        if (filter.inputElement.checked) {
          products = products.filter(function (product) {
            return product.nutritionFacts[filter.name] === true;
          });
        }
      });
    }

    window.catalog.renderProducts(products);
  };

  filterForm.addEventListener('change', onFormChange);

  rangeButtonLeft.addEventListener('mousedown', function (evt) {
    var startCoordinate = evt.clientX;

    var setMinPrice = function () {
      rangePriceMin.textContent = Math.round((rangeButtonLeft.offsetLeft) * 100 / (rangeFilter.offsetWidth - buttonWidth));
      rangeLine.style.left = rangeButtonLeft.offsetLeft + 'px';
    };

    var onButtonLeftMouseMove = function (moveEvt) {
      var shift = startCoordinate - moveEvt.clientX;
      var currentX = rangeButtonLeft.offsetLeft - shift;
      var rightEnd = rightButtonX - buttonWidth;

      if (currentX < 0) {
        rangeButtonLeft.style.left = '0px';
      } else if (currentX > rightEnd) {
        rangeButtonLeft.style.left = (rightEnd) + 'px';
      } else {
        startCoordinate = moveEvt.clientX;
        rangeButtonLeft.style.left = currentX + 'px';
      }

      setMinPrice();
    };

    var onButtonLeftMouseup = function () {
      setMinPrice();
      leftButtonX = rangeButtonLeft.offsetLeft;
      document.removeEventListener('mousemove', onButtonLeftMouseMove);
      document.removeEventListener('mouseup', onButtonLeftMouseup);
    };

    document.addEventListener('mousemove', onButtonLeftMouseMove);

    document.addEventListener('mouseup', onButtonLeftMouseup);
  });

  rangeButtonRight.addEventListener('mousedown', function (evt) {
    var startCoordinate = evt.clientX;

    var setMaxPrice = function () {
      rangePriceMax.textContent = Math.round((rangeButtonRight.offsetLeft) * 100 / (rangeFilter.offsetWidth - buttonWidth));
      rangeLine.style.right = (rangeFilter.offsetWidth - rangeButtonRight.offsetLeft - buttonWidth) + 'px';
    };

    var onButtonRightMouseMove = function (moveEvt) {
      var shift = startCoordinate - moveEvt.clientX;
      var currentX = rangeButtonRight.offsetLeft - shift;
      var leftEnd = leftButtonX + buttonWidth;
      var rangeEnd = rangeFilter.offsetWidth - buttonWidth;

      if (currentX < leftEnd) {
        rangeButtonRight.style.left = leftEnd + 'px';
      } else if (currentX > rangeEnd) {
        rangeButtonRight.style.left = rangeEnd + 'px';
      } else {
        startCoordinate = moveEvt.clientX;
        rangeButtonRight.style.left = currentX + 'px';
      }

      setMaxPrice();
    };

    var onButtonRightMouseup = function () {
      setMaxPrice();
      rightButtonX = rangeButtonRight.offsetLeft;
      document.removeEventListener('mousemove', onButtonRightMouseMove);
      document.removeEventListener('mouseup', onButtonRightMouseup);
    };

    document.addEventListener('mousemove', onButtonRightMouseMove);

    document.addEventListener('mouseup', onButtonRightMouseup);
  });
})();
