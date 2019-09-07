class NegociacaoService {

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
}