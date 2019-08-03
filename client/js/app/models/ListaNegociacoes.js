class ListaNegociacoes {

    constructor (armadilha) {
        this._negociacoes = [];
        this._armadilha = armadilha;
    }

    get negociacoes () {
        return [].concat(this._negociacoes);
    }

    adiciona (negociacao) {
        this._negociacoes.push(negociacao);
        this._armadilha(this);
    }

    esvazia () {
        this._negociacoes = [];
        this._armadilha(this);
    }
}