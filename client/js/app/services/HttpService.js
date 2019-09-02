class HttpService {


    get(url) {

        return new Promise( (resolve, reject) =>{

            let xhr = new XMLHttpRequest;

            xhr.open('GET', url);

            xhr.onreadystatechange = () => {

                if (xhr.readyState === 4) {

                    if (xhr.status === 200)

                        resolve(JSON.parse(xhr.responseText));

                    else
                        reject(JSON.parse(xhr.responseText));
                }
            }

            xhr.send();

        });
    }

    post(url, dado) {

        return Promise( (resolve, reject) => {

            let xhr = new XMLHttpRequest;

            xhr.open('POST', url);

            xhr.setRequestHeader('Content-type', 'application/json');

            xhr.onreadystatechange = () => {

                if (xhr.readyState === 4) {

                    if (xhr.status === 200)

                        resolve(JSON.parse(xhr.responseText));

                    else
                        reject(JSON.parse(xhr.responseText));
                }
            }

            xhr.send(JSON.stringify(dado));

        })
    }

}