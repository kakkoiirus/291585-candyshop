'use strict';

(function () {
  var filterForm = document.querySelector('.catalog__sidebar form');
  var catalogFilters = filterForm.querySelectorAll('ul.catalog__filter');
  var rangeButtonLeft = window.filterLogic.rangeButtonLeft;
  var rangeButtonRight = window.filterLogic.rangeButtonRight;
  var leftButtonX = rangeButtonLeft.offsetLeft;
  var rightButtonX = rangeButtonRight.offsetLeft;

  var onKindAndNutritionChange = function () {
    window.filterLogic.uncheckSpecialFilters();
    window.debounce(window.filterLogic.onFormChange);
  };

  var onSpecialChange = function (evt) {
    window.filterLogic.uncheckFilters(evt.target.id);
    window.filterLogic.setInitialRange();
    window.debounce(window.filterLogic.onFormChange);
  };

  var onSortChange = function () {
    window.debounce(window.filterLogic.onFormChange);
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.filterLogic.uncheckFilters(0);
    window.filterLogic.setInitialSortFilter();
    window.filterLogic.setInitialRange();
    window.debounce(window.filterLogic.onFormChange);
  };

  catalogFilters[0].addEventListener('change', onKindAndNutritionChange);
  catalogFilters[1].addEventListener('change', onKindAndNutritionChange);
  catalogFilters[2].addEventListener('change', onSpecialChange);
  catalogFilters[3].addEventListener('change', onSortChange);

  filterForm.addEventListener('submit', onFormSubmit);

  rangeButtonLeft.addEventListener('mousedown', function (evt) {
    var startCoordinate = evt.clientX;
    rangeButtonLeft.style.zIndex = 1000;
    rangeButtonRight.style.zIndex = 500;

    var onButtonLeftMouseMove = function (moveEvt) {
      var shift = startCoordinate - moveEvt.clientX;
      var currentX = rangeButtonLeft.offsetLeft - shift;
      var rightEnd = rightButtonX;

      if (currentX < 0) {
        rangeButtonLeft.style.left = '0px';
      } else if (currentX > rightEnd) {
        rangeButtonLeft.style.left = (rightEnd) + 'px';
      } else {
        startCoordinate = moveEvt.clientX;
        rangeButtonLeft.style.left = currentX + 'px';
      }

      window.filterLogic.setMinPrice();
    };

    var onButtonLeftMouseUp = function () {
      window.filterLogic.setMinPrice();
      leftButtonX = rangeButtonLeft.offsetLeft;
      window.debounce(window.filterLogic.onFormChange);
      document.removeEventListener('mousemove', onButtonLeftMouseMove);
      document.removeEventListener('mouseup', onButtonLeftMouseUp);
    };

    document.addEventListener('mousemove', onButtonLeftMouseMove);

    document.addEventListener('mouseup', onButtonLeftMouseUp);
  });

  rangeButtonRight.addEventListener('mousedown', function (evt) {
    var startCoordinate = evt.clientX;
    rangeButtonLeft.style.zIndex = 500;
    rangeButtonRight.style.zIndex = 1000;

    var onButtonRightMouseMove = function (moveEvt) {
      var shift = startCoordinate - moveEvt.clientX;
      var currentX = rangeButtonRight.offsetLeft - shift;
      var leftEnd = leftButtonX;
      var rangeEnd = window.filterLogic.rangeFilter.offsetWidth - window.filterLogic.buttonWidth;

      if (currentX < leftEnd) {
        rangeButtonRight.style.left = leftEnd + 'px';
      } else if (currentX > rangeEnd) {
        rangeButtonRight.style.left = rangeEnd + 'px';
      } else {
        startCoordinate = moveEvt.clientX;
        rangeButtonRight.style.left = currentX + 'px';
      }

      window.filterLogic.setMaxPrice();
    };

    var onButtonRightMouseup = function () {
      window.filterLogic.setMaxPrice();
      rightButtonX = rangeButtonRight.offsetLeft;
      window.debounce(window.filterLogic.onFormChange);
      document.removeEventListener('mousemove', onButtonRightMouseMove);
      document.removeEventListener('mouseup', onButtonRightMouseup);
    };

    document.addEventListener('mousemove', onButtonRightMouseMove);

    document.addEventListener('mouseup', onButtonRightMouseup);
  });
})();
