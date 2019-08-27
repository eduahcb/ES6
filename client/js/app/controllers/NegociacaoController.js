class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._intputQuatidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._form = $('.form');

        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._listaNegociacoes = new Bind(new ListaNegociacoes(), this._negociacoesView, 'adiciona', 'esvazia');

        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagem = new Bind(new Mensagem(), this._mensagemView, 'texto');
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

    importaNegociacoes() {

        let service = new NegociacaoService();

        service.obterNegociacoesDaSemana( (err, result) => {

            if(err){
                this._mensagem.texto = err;
            }
            
            result.forEach( negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações da semana importadas com sucesso';
        });
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