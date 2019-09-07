import {currentInstance} from './controllers/NegociacaoController';
import {} from './polyfill/es6';

let negociacao = new currentInstance();

document.querySelector('.form').onsubmit = negociacao.adiciona.bind(negociacao);
document.querySelector('[typé=button]').onclick = negociacao.apaga.bind(negociacao);