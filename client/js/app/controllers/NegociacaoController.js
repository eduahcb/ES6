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

        this._init();
    }

    _init(){

        ConnectionFactory
            .getConnection()
            .then( connection => new NegociacaoDao(connection))
            .then( dao => dao.listaTodos())
            .then( negociacoes => negociacoes.forEach(  negociacao => this._listaNegociacoes.adiciona(negociacao)))
            .catch( erro => this._mensagem.texto = erro);


        setInterval( () => {

            this.importaNegociacoes();

        }, 5000);

    }

    adiciona(event) {

        event.preventDefault();

        let negociacao = this._criaNegociacao();

        new NegociacaoService()
            .cadastra(negociacao)
            .then( mensagem => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = mensagem;
            })
            .catch( erro => this._mensagem.texto = erro);

    }

    apaga() {

        ConnectionFactory
            .getConnection()
            .then( connection => new NegociacaoDao(connection))
            .then( dao => dao.apagaTodos())
            .then( mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvazia();  
            });
    }

    importaNegociacoes() {

        let service = new NegociacaoService();

        service.obterNegociacoes()
            .then( negociacoes => 
                negociacoes.filter(negociacao => 
                    !this._listaNegociacoes.negociacoes.some(negociacaoExistente =>
                        JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente)))
            )
            .then(negociacoes => negociacoes.forEach(negociacao => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = 'Negociações do período importadas com sucesso';  
            }))
            .catch(erro => this._mensagem.texto = erro);
    }

    ordena(coluna) {

        if (this._ordemAtual === coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }

        this._ordemAtual = coluna;
    }

    _criaNegociacao() {

        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._intputQuatidade.value),
            parseFloat(this._inputValor.value)
        );
    }

    _limpaCampos() {
        this._form.reset();
        this._inputData.focus();
    }
}