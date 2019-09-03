class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._intputQuatidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._form = $('.form');

        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._listaNegociacoes = new Bind(new ListaNegociacoes(), this._negociacoesView, 'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagem = new Bind(new Mensagem(), this._mensagemView, 'texto');
        this._ordemAtual = '';
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

        service.obterNegociacoes()
            .then(negociacoes => {

                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociações do período importadas com sucesso';
            })
            .catch( erro => this._mensagem.texto = erro);
    }

    ordena (coluna) {

        if(this._ordemAtual === coluna){
            this._listaNegociacoes.inverteOrdem();
        }
        else{
            this._listaNegociacoes.ordena( (a, b) => a[coluna] - b[coluna]);
        }

        this._ordemAtual = coluna;
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