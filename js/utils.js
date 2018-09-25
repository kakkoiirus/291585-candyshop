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

  window.utils = {
    getRandomInt: getRandomInt,
    getRandomIntRange: getRandomIntRange,
    getRandomBool: getRandomBool,
    getRandomString: getRandomString,
  };
})();
