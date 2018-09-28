'use strict';

(function () {
  var buyForm = document.querySelector('.buy form');

  var onSubmitSuccess = function (message) {
    buyForm.reset();
    window.order.setTabsInitialState();
    window.notification.showMessage('success', message);
  };

  var onSubmitError = function (message) {
    window.notification.showMessage('error', message);
  };

  buyForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(buyForm), onSubmitSuccess, onSubmitError);
  });
})();
