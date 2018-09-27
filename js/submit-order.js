'use strict';

(function () {
  var buyForm = document.querySelector('.buy form');
  var modals = document.querySelectorAll('.modal');
  var modalUploadError = modals[0];
  var modalUploadErrorMessage = modalUploadError.querySelector('.modal__message');
  var modalUploadSuccess = modals[1];

  var onSuccessEscPress = function (evt) {
    if (evt.keyCode === 27) {
      modalUploadSuccess.classList.add('modal--hidden');
      document.removeEventListener('keydown', onSuccessEscPress);
    }
  };

  var onErrorEscPress = function (evt) {
    if (evt.keyCode === 27) {
      modalUploadError.classList.add('modal--hidden');
      document.removeEventListener('keydown', onErrorEscPress);
    }
  };

  var onSubmitSuccess = function () {
    buyForm.reset();
    window.order.setTabsInitialState();
    modalUploadSuccess.classList.remove('modal--hidden');

    document.addEventListener('keydown', onSuccessEscPress);
  };

  var onSubmitError = function (message) {
    modalUploadError.classList.remove('modal--hidden');
    modalUploadErrorMessage.textContent = message;

    document.addEventListener('keydown', onErrorEscPress);
  };

  buyForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(buyForm), onSubmitSuccess, onSubmitError);
  });

  modals.forEach(function (modalWindow) {
    modalWindow.querySelector('.modal__close').addEventListener('click', function () {
      modalWindow.classList.add('modal--hidden');
    });
  });
})();
