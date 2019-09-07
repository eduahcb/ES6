"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var NegociacaoService =
/*#__PURE__*/
function () {
  function NegociacaoService() {
    _classCallCheck(this, NegociacaoService);

    this._service = new HttpService();
  }

  _createClass(NegociacaoService, [{
    key: "obterNegociacoesDaSemana",
    value: function obterNegociacoesDaSemana() {
      return this._service.get('negociacoes/semana').then(function (result) {
        return result.map(function (objeto) {
          return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
        });
      })["catch"](function () {
        throw new Error('não foi possível objter negociações');
      });
    }
  }, {
    key: "obterNegociacoesDaSemanaAnterior",
    value: function obterNegociacoesDaSemanaAnterior() {
      return this._service.get('negociacoes/semana').then(function (result) {
        return result.map(function (objeto) {
          return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
        });
      })["catch"](function () {
        throw new Error('não foi possível objter negociações da semana anterior');
      });
    }
  }, {
    key: "obterNegociacoesDaSemanaRetrasada",
    value: function obterNegociacoesDaSemanaRetrasada() {
      return this._service.get('negociacoes/semana').then(function (result) {
        return result.map(function (objeto) {
          return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
        });
      })["catch"](function () {
        throw new Error('não foi possível objter negociações da semana retrasada');
      });
    }
  }, {
    key: "obterNegociacoes",
    value: function obterNegociacoes() {
      return Promise.all([this.obterNegociacoesDaSemana(), this.obterNegociacoesDaSemanaAnterior(), this.obterNegociacoesDaSemanaRetrasada()]).then(function (periodo) {
        var negociacoes = periodo.reduce(function (dados, periodo) {
          return dados.concat(periodo);
        }, []);
        return negociacoes;
      })["catch"](function (error) {
        throw new Error(error);
      });
    }
  }, {
    key: "cadastra",
    value: function cadastra(negociacao) {
      return ConnectionFactory.getConnection().then(function (connection) {
        return new NegociacaoDao(connection);
      }).then(function (dao) {
        return dao.adiciona(negociacao);
      }).then(function () {
        return 'Negociacao adicionada com sucesso';
      })["catch"](function (erro) {
        console.log(erro);
        throw new Error('Não foi possível adicionar a negociação');
      });
    }
  }, {
    key: "lista",
    value: function lista() {
      return ConnectionFactory.getConnection().then(function (connection) {
        return new NegociacaoDao(connection);
      }).then(function (dao) {
        return dao.listaTodos();
      })["catch"](function (erro) {
        throw new Error('Não foi possível obter as negociações');
      });
    }
  }, {
    key: "apaga",
    value: function apaga() {
      return ConnectionFactory.getConnection().then(function (connection) {
        return new NegociacaoDao(connection);
      }).then(function (dao) {
        return dao.apagaTodos();
      }).then(function () {
        return 'Negociações apagadas com sucesso';
      })["catch"](function (erro) {
        throw new Error('Não foi possível apagar as negociacoes');
      });
    }
  }, {
    key: "importa",
    value: function importa(listaAtual) {
      return this.obterNegociacoes().then(function (negociacoes) {
        return negociacoes.filter(function (negociacao) {
          return !listaAtual.some(function (negociacaoExistente) {
            return negociacao.isEquals(negociacaoExistente);
          });
        });
      })["catch"](function (erro) {
        console.log(erro);
        throw new Error('Não foi possível buscar negociações para importar');
      });
    }
  }]);

  return NegociacaoService;
}();
//# sourceMappingURL=NegociacaoService.js.map