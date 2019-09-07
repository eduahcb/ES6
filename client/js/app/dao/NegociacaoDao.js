"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var NegociacaoDao =
/*#__PURE__*/
function () {
  function NegociacaoDao(connection) {
    _classCallCheck(this, NegociacaoDao);

    this._connection = connection;
    this._store = 'Negociacoes';
  }

  _createClass(NegociacaoDao, [{
    key: "adiciona",
    value: function adiciona(negociacao) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        console.log(_this._connecion);

        var request = _this._connection.transaction([_this._store], 'readwrite').objectStore(_this._store).add(negociacao);

        request.onsuccess = function (e) {
          resolve();
        };

        request.onerror = function (e) {
          console.log(e.target.error);
          reject('Não foi possível adicionar a negociação');
        };
      });
    }
  }, {
    key: "listaTodos",
    value: function listaTodos() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var cursor = _this2._connection.transaction(_this2._store, 'readwrite').objectStore(_this2._store).openCursor();

        var negociacoes = [];

        cursor.onsuccess = function (e) {
          var atual = e.target.result;

          if (atual) {
            var dado = atual.value;
            negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
            atual["continue"]();
          } else {
            resolve(negociacoes);
          }
        };

        cursor.onerror = function (e) {
          console.log(e.target.error.name);
          reject('Não foi possível listar as negociações');
        };
      });
    }
  }, {
    key: "apagaTodos",
    value: function apagaTodos() {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        var request = _this3._connection.transaction(_this3._store, 'readwrite').objectStore(_this3._store).clear();

        request.onsuccess = function (e) {
          return resolve('Negociações removidadas com sucesso');
        };

        request.onerror = function (e) {
          return reject('Não foi possível remover as negociações');
        };
      });
    }
  }]);

  return NegociacaoDao;
}();
//# sourceMappingURL=NegociacaoDao.js.map