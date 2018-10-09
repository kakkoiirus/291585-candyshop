'use strict';

(function () {
  var PRODUCTS_URL = 'https://js.dump.academy/candyshop/data';
  var SUBMIT_URL = 'https://js.dump.academy/candyshop';
  var XHR_STATUS_OK = 200;
  var XHR_TIMEOUT = 10000;

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === XHR_STATUS_OK) {
        onSuccess(xhr.response);
      } else {
        onError('Код ошибки: ' + xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = XHR_TIMEOUT;
    xhr.open('GET', PRODUCTS_URL);
    xhr.send();
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === XHR_STATUS_OK) {
        onSuccess(xhr.response);
      } else {
        onError('Код ошибки: ' + xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('POST', SUBMIT_URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };
})();
