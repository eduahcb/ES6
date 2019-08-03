class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._intputQuatidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._form = $('.form');
        
        this._listaNegociacoes = new ListaNegociacoes( (model) =>  this._negociacoesView.update(model.negociacoes));
        
        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._negociacoesView.update(this._listaNegociacoes.negociacoes);

        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagemView.update(this._mensagem);
    }

    adiciona(event) {

        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._limpaCampos();
        //mostra mensagem
        this._mensagem.texto = 'Negociação adicionada com sucesso.';
        this._mensagemView.update(this._mensagem);
    }

    apaga () {

        this._listaNegociacoes.esvazia();
        this._mensagem = "Negociações apagadas com sucesso.";
        this._mensagemView.update(this._mensagem);
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