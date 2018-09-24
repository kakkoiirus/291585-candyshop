'use strict';

(function () {
  var CARD_VALIDATION_OK_MESSAGE = 'Одобрен';
  var CARD_VALIDATION_ERROR_MESSAGE = 'Неизвестен';
  var CARD_NUMBER_ERROR_MESSAGE = 'Неправильный номер банковской карты';

  var checkCardData = function (cardDataFields, paymentCardNumber) {
    var result = {
      customCardValidityMessage: '',
      isValid: true,
      message: CARD_VALIDATION_OK_MESSAGE
    };

    for (var i = 0; i < cardDataFields.length; i++) {
      if (!cardDataFields[i].checkValidity()) {
        result.isValid = false;
        result.message = CARD_VALIDATION_ERROR_MESSAGE;
        break;
      }
    }
    if (result.isValid) {
      result.isValid = window.utils.checkLuhn(paymentCardNumber.value);
      if (!result.isValid) {
        result.customValidityMessage = CARD_NUMBER_ERROR_MESSAGE;
      }
    }

    return result;
  };

  window.validation = {
    checkCardData: checkCardData
  };
})();
