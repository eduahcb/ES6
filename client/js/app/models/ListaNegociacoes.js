class ListaNegociacoes {

    constructor () {
        this._negociacoes = [];
    }

    get negociacoes () {
        return [].concat(this._negociacoes);
    }

    get volumeTotal () {

        return this._negociacoes.reduce( (acum, n) => acum + n.volume, 0.0);
    }

    adiciona (negociacao) {
        this._negociacoes.push(negociacao);
    }

    esvazia () {
        this._negociacoes = [];
    }

    ordena (criterio) {

        this._negociacoes.sort(criterio);
    }

    inverteOrdem() {
        this._negociacoes.reverse();
    }
}