'use strict';

(function () {
  var checkCardData = function (cardDataFields) {
    var isValid = true;

    for (var i = 0; i < cardDataFields.length; i++) {
      if (!cardDataFields[i].checkValidity()) {
        isValid = false;
        break;
      }
    }

    return isValid;
  };

  window.validation = {
    checkCardData: checkCardData
  };
})();
