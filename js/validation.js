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
      result.isValid = checkLuhn(paymentCardNumber.value);
      if (!result.isValid) {
        result.customValidityMessage = CARD_NUMBER_ERROR_MESSAGE;
      }
    }

    return result;
  };

  var checkLuhn = function (cardNumber) {
    var cardNumbers = cardNumber.split('');
    var sumOfNumbers = 0;

    for (var i = 0; i < cardNumbers.length; i++) {
      if (i % 2 !== 0) {
        sumOfNumbers += Number(cardNumbers[i]);
      } else {
        var tempNumber = Number(cardNumbers[i]) * 2;

        if (tempNumber > 9) {
          tempNumber = tempNumber - 9;
        }

        sumOfNumbers += tempNumber;
      }
    }

    return sumOfNumbers % 10 === 0;
  };

  window.validation = {
    checkCardData: checkCardData
  };
})();
