class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._intputQuatidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._form = $('.form');
        this._listaNegociacoes = new ListaNegociacoes();
        this._negociacoesView = new NegociacoesView($('#negociacoesView'));

        this._negociacoesView.update(this._listaNegociacoes.negociacoes);
    }

    adiciona(event) {

        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._negociacoesView.update(this._listaNegociacoes.negociacoes);
        this._limpaCampos();
    }

    _criaNegociacao () {

        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._intputQuatidade.value,
            this._inputValor.value
        );
    }

    _limpaCampos () {
        this._form.reset();
        this._inputData.focus();
    }
}