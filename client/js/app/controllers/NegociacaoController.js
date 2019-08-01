class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._intputQuatidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._form =  $('.form');
    }


    adiciona(event) {

        event.preventDefault();

        let data = new Date(...this._inputData.value.split('-').map( (item, index) => item - index % 2));

        let negociacao = new Negociacao(
            data,
            this._intputQuatidade.value,
            this._inputValor.value
        );

        this._limpaCampos();
    }

    _limpaCampos () {
        this._form.reset();
        this._inputData.focus();
    }
}