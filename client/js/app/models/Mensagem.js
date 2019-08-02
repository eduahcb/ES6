class Mensagem {

    constructor(texto = '') {
        this._texto;
    }

    get texto() {
        return this._texto;
    }

    set texto (texto) {
        return this._texto = texto;
    }
}