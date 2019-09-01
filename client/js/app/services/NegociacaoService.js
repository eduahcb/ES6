class NegociacaoService {

    obterNegociacoesDaSemana(callback) {

        let xhr = new XMLHttpRequest;

        xhr.open('GET', 'negociacoes/semana');

        xhr.onreadystatechange = () => {

            if (xhr.readyState === 4) {

                if (xhr.status === 200)

                    callback(null, JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));

                else
                    callback('não foi possível objter negociações');
            }
        }

        xhr.send();
    }

    obterNegociacoesDaSemanaAnterior(callback) {


        let xhr = new XMLHttpRequest;

        xhr.open('GET', 'negociacoes/anterior');

        xhr.onreadystatechange = () => {

            if (xhr.readyState === 4) {

                if (xhr.status === 200)

                    callback(null, JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));

                else
                    callback('não foi possível objter negociações da semana anterior');
            }
        }

        xhr.send();

    }

    obterNegociacoesDaSemanaRetrasada(callback) {
        
        let xhr = new XMLHttpRequest;

        xhr.open('GET', 'negociacoes/retrasada');

        xhr.onreadystatechange = () => {

            if (xhr.readyState === 4) {

                if (xhr.status === 200)

                    callback(null, JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));

                else
                    callback('não foi possível objter negociações da semana retrasada');
            }
        }

        xhr.send();
    }
}