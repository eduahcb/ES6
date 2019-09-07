"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var NegociacoesView =
/*#__PURE__*/
function (_View) {
  _inherits(NegociacoesView, _View);

  function NegociacoesView(elemento) {
    _classCallCheck(this, NegociacoesView);

    return _possibleConstructorReturn(this, _getPrototypeOf(NegociacoesView).call(this, elemento));
  }

  _createClass(NegociacoesView, [{
    key: "template",
    value: function template(model) {
      return "\n        \n        <table class=\"table table-hover table-bordered\">\n            <thead>\n                <tr>\n                    <th>DATA</th>\n                    <th>QUANTIDADE</th>\n                    <th>VALOR</th>\n                    <th>VOLUME</th>\n                </tr>\n            </thead>\n            <tbody>\n                ".concat(model.negociacoes.map(function (n) {
        return "\n\n                    <tr>\n                        <td onclick=\"negociacaoController.ordena('data')\" >".concat(DateHelper.dataParaTexto(n.data), "</td>\n                        <td onclick=\"negociacaoController.ordena('quantidade')\">").concat(n.quantidade, "</td>\n                        <td onclick=\"negociacaoController.ordena('valor')\">").concat(n.valor, "</td>\n                        <td onclick=\"negociacaoController.ordena('volume')\">").concat(n.volume, "</td>\n                    <tr>\n                \n                ");
      }).join(''), "\n            </tbody>\n                <td colspan=\"3\"></td>\n                <td>").concat(model.volumeTotal, "</td>\n            <tfoot>\n            </tfoot>\n        </table>\n        \n        ");
    }
  }]);

  return NegociacoesView;
}(View);
//# sourceMappingURL=NegociacoesView.js.map