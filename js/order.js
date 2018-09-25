'use strict';

(function () {
  var isCartEmpty = true;
  var deliver = document.querySelector('.deliver');
  var deliverToggle = deliver.querySelector('.deliver__toggle');
  var deliverStoresFieldset = deliver.querySelector('.deliver__stores');
  var deliverCourierFieldset = deliver.querySelector('.deliver__entry-fields-wrap');

  var deliverTabs = {
    'deliver__store': {
      'element': deliver.querySelector('.deliver__store'),
      'fieldset': deliverStoresFieldset
    },
    'deliver__courier': {
      'element': deliver.querySelector('.deliver__courier'),
      'fieldset': deliverCourierFieldset
    },
    'active': deliverToggle.querySelector('input:checked').id
  };

  var setCartStatus = function (status) {
    isCartEmpty = status;
  };

  var onDeliverToggleChange = function (evt) {
    deliverTabs[deliverTabs.active].element.classList.add('visually-hidden');
    deliverTabs[deliverTabs.active].fieldset.disabled = true;
    deliverTabs.active = evt.target.id;
    deliverTabs[deliverTabs.active].element.classList.remove('visually-hidden');
    if (!isCartEmpty) {
      deliverTabs[deliverTabs.active].fieldset.disabled = false;
    }
  };

  deliverToggle.addEventListener('change', onDeliverToggleChange);

  var buySection = document.querySelector('.buy');
  var orderSection = buySection.querySelector('.order');
  var buySubmitButton = buySection.querySelector('.buy__submit-btn');
  var contactDataInputs = orderSection.querySelectorAll('.contact-data__inputs input');
  var paymentCardInputs = orderSection.querySelectorAll('.payment__inputs input');

  var toggleContactInputs = function (status) {
    for (var i = 0; i < contactDataInputs.length; i++) {
      contactDataInputs[i].disabled = status;
    }
  };

  var togglePaymentCardInputs = function (status) {
    for (var i = 0; i < paymentCardInputs.length; i++) {
      paymentCardInputs[i].disabled = status;
    }
  };

  var disableBuyForm = function () {
    toggleContactInputs(true);
    togglePaymentCardInputs(true);

    deliverStoresFieldset.disabled = true;
    deliverCourierFieldset.disabled = true;
    buySubmitButton.disabled = true;
  };

  var enableBuyForm = function () {
    toggleContactInputs(false);
    togglePaymentCardInputs(false);

    deliverTabs[deliverTabs.active].fieldset.disabled = false;
    buySubmitButton.disabled = false;
  };

  var deliverStoreList = buySection.querySelector('.deliver__store-list');
  var deliverStoreMapImage = buySection.querySelector('.deliver__store-map-img');

  deliverStoreList.addEventListener('change', function (evt) {
    deliverStoreMapImage.src = 'img/map/' + evt.target.value + '.jpg';
  });

  var paymentSection = orderSection.querySelector('.payment');
  var paymentMethodCardInput = paymentSection.querySelector('#payment__card');
  var paymentMethodCardWrap = paymentSection.querySelector('.payment__card-wrap');
  var paymentMethodCashInput = paymentSection.querySelector('#payment__cash');
  var paymentMethodCashWrap = paymentSection.querySelector('.payment__cash-wrap');
  var paymentInputsWrapper = paymentSection.querySelector('.payment__inputs');
  var paymentInputs = paymentSection.querySelectorAll('.payment__inputs input');
  var paymentCardNumber = orderSection.querySelector('#payment__card-number');
  var paymentCardStatus = orderSection.querySelector('.payment__card-status');

  var onPaymentInputsChange = function () {
    var validationResult = window.validation.checkCardData(paymentInputs, paymentCardNumber);
    paymentCardStatus.textContent = validationResult.message;
    paymentCardNumber.setCustomValidity(validationResult.customCardValidityMessage);
  };

  paymentMethodCardInput.addEventListener('change', function () {
    paymentMethodCardWrap.classList.toggle('visually-hidden');
    paymentMethodCashWrap.classList.toggle('visually-hidden');

    if (!isCartEmpty) {
      togglePaymentCardInputs(false);
    }
  });

  paymentMethodCashInput.addEventListener('change', function () {
    paymentMethodCardWrap.classList.toggle('visually-hidden');
    paymentMethodCashWrap.classList.toggle('visually-hidden');
    togglePaymentCardInputs(true);
  });

  paymentInputsWrapper.addEventListener('input', onPaymentInputsChange);

  disableBuyForm();
  paymentCardStatus.textContent = 'Неизвестен';

  window.order = {
    enableBuyForm: enableBuyForm,
    disableBuyForm: disableBuyForm,
    setCartStatus: setCartStatus
  };
})();
