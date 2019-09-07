class HttpService {


    get(url) {

        return fetch(url)
            .then(res => res.json())
            .then(data => data)
            .catch(erro => erro);

    }

    post(url, dado) {

        return fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(dado)
            })
            .then(res => res.json())
            .then(dado => dado)
            .catch(erro => erro);

    }

}