import {ConnectionFactory} from './ConnectionFactory';
import {Negociacao} from '../models/Negociacao';
import {HttpService} from './HttpService';

export class NegociacaoService {

    constructor() {
        this._service = new HttpService();
    }

    obterNegociacoesDaSemana() {

        return this._service.get('negociacoes/semana')
                .then(result => {

                    return result.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
                })
                .catch( () => {
                    throw new Error('não foi possível objter negociações');
                });
    }

    obterNegociacoesDaSemanaAnterior() {

        return this._service.get('negociacoes/semana')
                .then(result => {

                    return result.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
                })
                .catch( () => {
                    throw new Error('não foi possível objter negociações da semana anterior');
                });
    }

    obterNegociacoesDaSemanaRetrasada() {

        return this._service.get('negociacoes/semana')
                .then(result => {

                    return result.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
                })
                .catch( () => {
                    throw new Error('não foi possível objter negociações da semana retrasada');
                });
    }

    obterNegociacoes () {

        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()
        ])
        .then(periodo => {
            
            let negociacoes = periodo.reduce((dados, periodo) => dados.concat(periodo), []);

            return negociacoes;
        })
        .catch(error => {
            throw  new Error(error);
        });

    }

    cadastra(negociacao){

        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then( dao => dao.adiciona(negociacao))
            .then( () => 'Negociacao adicionada com sucesso')
            .catch( (erro) => {
                console.log(erro);
                throw new Error('Não foi possível adicionar a negociação') 
            });

    }

    lista() {

        return ConnectionFactory
        .getConnection()
        .then( connection => new NegociacaoDao(connection))
        .then( dao => dao.listaTodos())
        .catch( () => {
            throw new Error('Não foi possível obter as negociações');
        });

    }

    apaga() {

        return ConnectionFactory
                .getConnection()
                .then( connection => new NegociacaoDao(connection))
                .then( dao => dao.apagaTodos())
                .then( () => 'Negociações apagadas com sucesso')
                .catch( erro => {
                    throw new Error('Não foi possível apagar as negociacoes');
                });
    }

    importa(listaAtual) {

          return  this.obterNegociacoes()
            .then( negociacoes => 
                negociacoes.filter(negociacao => 
                    !listaAtual.some(negociacaoExistente =>
                        negociacao.isEquals(negociacaoExistente)))
            )
            .catch( erro => {
                console.log(erro);
                throw new Error('Não foi possível buscar negociações para importar');
            })
    }
}