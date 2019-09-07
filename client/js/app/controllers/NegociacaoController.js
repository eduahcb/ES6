"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var NegociacaoController =
/*#__PURE__*/
function () {
  function NegociacaoController() {
    _classCallCheck(this, NegociacaoController);

    var $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._intputQuatidade = $('#quantidade');
    this._inputValor = $('#valor');
    this._form = $('.form');
    this._negociacoesView = new NegociacoesView($('#negociacoesView'));
    this._listaNegociacoes = new Bind(new ListaNegociacoes(), this._negociacoesView, 'adiciona', 'esvazia', 'ordena', 'inverteOrdem');
    this._mensagemView = new MensagemView($('#mensagemView'));
    this._mensagem = new Bind(new Mensagem(), this._mensagemView, 'texto');
    this._ordemAtual = '';
    this._negociacoesService = new NegociacaoService();

    this._init();
  }

  _createClass(NegociacaoController, [{
    key: "_init",
    value: function _init() {
      var _this = this;

      this._negociacoesService.lista().then(function (negociacoes) {
        return negociacoes.forEach(function (negociacao) {
          return _this._listaNegociacoes.adiciona(negociacao);
        });
      })["catch"](function (erro) {
        _this._mensagem.texto = erro;
      });

      setInterval(function () {
        _this.importaNegociacoes();
      }, 5000);
    }
  }, {
    key: "adiciona",
    value: function adiciona(event) {
      var _this2 = this;

      event.preventDefault();

      var negociacao = this._criaNegociacao();

      this._negociacoesService.cadastra(negociacao).then(function (mensagem) {
        _this2._listaNegociacoes.adiciona(negociacao);

        _this2._mensagem.texto = mensagem;
      })["catch"](function (erro) {
        return _this2._mensagem.texto = erro;
      });
    }
  }, {
    key: "apaga",
    value: function apaga() {
      var _this3 = this;

      this._negociacoesService.apaga().then(function (mensagem) {
        _this3._mensagem.texto = mensagem;

        _this3._listaNegociacoes.esvazia();
      })["catch"](function (erro) {
        return _this3._mensagem.texto = erro;
      });
    }
  }, {
    key: "importaNegociacoes",
    value: function importaNegociacoes() {
      var _this4 = this;

      this._negociacoesService.importa(this._listaNegociacoes.negociacoes).then(function (negociacoes) {
        return negociacoes.forEach(function (negociacao) {
          _this4._listaNegociacoes.adiciona(negociacao);

          _this4._mensagem.texto = 'Negociacoes importadas';
        });
      })["catch"](function (erro) {
        return _this4._mensagem.texto = erro;
      });
    }
  }, {
    key: "ordena",
    value: function ordena(coluna) {
      if (this._ordemAtual === coluna) {
        this._listaNegociacoes.inverteOrdem();
      } else {
        this._listaNegociacoes.ordena(function (a, b) {
          return a[coluna] - b[coluna];
        });
      }

      this._ordemAtual = coluna;
    }
  }, {
    key: "_criaNegociacao",
    value: function _criaNegociacao() {
      return new Negociacao(DateHelper.textoParaData(this._inputData.value), parseInt(this._intputQuatidade.value), parseFloat(this._inputValor.value));
    }
  }, {
    key: "_limpaCampos",
    value: function _limpaCampos() {
      this._form.reset();

      this._inputData.focus();
    }
  }]);

  return NegociacaoController;
}();
//# sourceMappingURL=NegociacaoController.js.map