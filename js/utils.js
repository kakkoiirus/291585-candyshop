'use strict';

(function () {
  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getRandomIntRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomBool = function () {
    return Math.random() >= 0.5;
  };

  var getRandomString = function (data) {
    var randomString = '';
    var count = getRandomInt(1, data.length);

    for (var i = 1; i <= count; i++) {
      randomString += (i < count ? data[i] + ', ' : data[i]);
    }

    return randomString;
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

  window.utils = {
    getRandomInt: getRandomInt,
    getRandomIntRange: getRandomIntRange,
    getRandomBool: getRandomBool,
    getRandomString: getRandomString,
    checkLuhn: checkLuhn
  };
})();
