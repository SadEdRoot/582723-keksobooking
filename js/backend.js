'use strict';

(function () {
  var URL = 'https://js.dump.academy/code-and-magick/data';

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });

    xhr.open('POST', URL);
    xhr.send(data);

  };

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.send();
  };

  window.bacend = {
    save: save,
    load: load
  };
})();
