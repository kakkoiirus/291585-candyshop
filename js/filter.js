'use strict';

(function () {
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
