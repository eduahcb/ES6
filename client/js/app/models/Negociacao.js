"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Negociacao =
/*#__PURE__*/
function () {
  function Negociacao(data, quantidade, valor) {
    _classCallCheck(this, Negociacao);

    this._data = new Date(data.getTime());
    this._quantidade = quantidade;
    this._valor = valor;
    Object.freeze(this);
  }

  _createClass(Negociacao, [{
    key: "isEquals",
    value: function isEquals(outraNegociacao) {
      return this._data.getTime() == outraNegociacao.data.getTime() && this._valor == outraNegociacao.valor;
    }
  }, {
    key: "data",
    get: function get() {
      return new Date(this._data.getTime());
    }
  }, {
    key: "quantidade",
    get: function get() {
      return this._quantidade;
    }
  }, {
    key: "valor",
    get: function get() {
      return this._valor;
    }
  }, {
    key: "volume",
    get: function get() {
      return this._quantidade * this._valor;
    }
  }]);

  return Negociacao;
}();
//# sourceMappingURL=Negociacao.js.map