class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._intputQuatidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._form = $('.form');

        this._listaNegociacoes = ProxyFactory.create(
            new ListaNegociacoes(),
            model => this._negociacoesView.update(model.negociacoes),
            'adiciona', 'esvazia'
        );

        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._negociacoesView.update(this._listaNegociacoes.negociacoes);

        this._mensagem = ProxyFactory.create(
            new Mensagem(),
            model => this._mensagemView.update(model),
            'texto'
        );

        console.log(this._mensagem.texto)
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagemView.update(this._mensagem.texto);
    }

    adiciona(event) {

        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._limpaCampos();
        this._mensagem.texto = 'Negociação adicionada com sucesso.';
    }

    apaga() {

        this._listaNegociacoes.esvazia();
        this._mensagem.texto = "Negociações apagadas com sucesso.";
    }

    _criaNegociacao() {

        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._intputQuatidade.value,
            this._inputValor.value
        );
    }

    _limpaCampos() {
        this._form.reset();
        this._inputData.focus();
    }
}