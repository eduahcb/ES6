import {NegociacoesView} from '../views/NegociacoesView';
import {Bind} from '../helpers/Bind';
import {ListaNegociacoes} from '../models/ListaNegociacoes';
import {MensagemView} from '../views/MensagemView';
import {Mensagem} from '../models/Mensagem';
import {NegociacaoService} from '../services/NegociacaoService';
import {Negociacao} from '../models/Negociacao';
import {DateHelper } from '../helpers/DateHelper';

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

        this._negociacoesService = new NegociacaoService();
        this._init();

    }

    _init() {

        this._negociacoesService
            .lista()
            .then(negociacoes =>
                negociacoes.forEach(negociacao =>
                    this._listaNegociacoes.adiciona(negociacao))
            )
            .catch(erro => {
                this._mensagem.texto = erro;
            });

        setInterval(() => {

            this.importaNegociacoes();

        }, 5000);

    }

    adiciona(event) {

        event.preventDefault();

        let negociacao = this._criaNegociacao();

        this._negociacoesService
            .cadastra(negociacao)
            .then(mensagem => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = mensagem;
            })
            .catch(erro => this._mensagem.texto = erro);
    }

    apaga() {

       this._negociacoesService
            .apaga()
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvazia();
            })
            .catch(erro => this._mensagem.texto = erro);
    }

    importaNegociacoes() {

        this._negociacoesService
            .importa(this._listaNegociacoes.negociacoes)
            .then(negociacoes => negociacoes.forEach(negociacao => {
                    this._listaNegociacoes.adiciona(negociacao)
                    this._mensagem.texto = 'Negociacoes importadas';
                })
            )
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

let negociacaoController = new NegociacaoController();

export const currentInstance = () => negociacaoController;