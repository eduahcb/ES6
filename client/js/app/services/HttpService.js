"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HttpService =
/*#__PURE__*/
function () {
  function HttpService() {
    _classCallCheck(this, HttpService);
  }

  _createClass(HttpService, [{
    key: "get",
    value: function get(url) {
      return fetch(url).then(function (res) {
        return res.json();
      }).then(function (data) {
        return data;
      })["catch"](function (erro) {
        return erro;
      });
    }
  }, {
    key: "post",
    value: function post(url, dado) {
      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(dado)
      }).then(function (res) {
        return res.json();
      }).then(function (dado) {
        return dado;
      })["catch"](function (erro) {
        return erro;
      });
    }
  }]);

  return HttpService;
}();
//# sourceMappingURL=HttpService.js.map