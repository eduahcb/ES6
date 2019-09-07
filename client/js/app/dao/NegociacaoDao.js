class NegociacaoDao {

    constructor(connection) {
        this._connection = connection;
        this._store = 'Negociacoes';
    }

    adiciona(negociacao) {

        return new Promise((resolve, reject) => {

            console.log(this._connecion);

            let request = this._connection.transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(negociacao);

            request.onsuccess = e => {
                resolve();
            }

            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível adicionar a negociação');
            }
        });
    }

}