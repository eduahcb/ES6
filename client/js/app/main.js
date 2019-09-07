"use strict";

System.register(["./controllers/NegociacaoController", "./polyfill/es6"], function (_export, _context) {
  "use strict";

  var currentInstance, negociacao;
  return {
    setters: [function (_controllersNegociacaoController) {
      currentInstance = _controllersNegociacaoController.currentInstance;
    }, function (_polyfillEs) {}],
    execute: function () {
      negociacao = new currentInstance();
      document.querySelector('.form').onsubmit = negociacao.adiciona.bind(negociacao);
      document.querySelector('[typé=button]').onclick = negociacao.apaga.bind(negociacao);
    }
  };
});
//# sourceMappingURL=main.js.map