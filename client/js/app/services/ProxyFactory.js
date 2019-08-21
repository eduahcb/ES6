class ProxyFactory {

    static create(objeto, acao, props) {

        return new Proxy(objeto, {
            
            get(target, prop, receiver) {
                
                if (props.includes(prop) && ProxyFactory._ehFuncao(target[prop])) {

                    return function () {
                        console.log(`${prop} foi interceptado`);
                        Reflect.apply(target[prop], target, arguments);
                        return acao(target);
                    }
                }
                return Reflect.get(target, prop, receiver);
            },
            set(target, prop, value, receiver) {

                if (props.includes(prop)) {
                    console.log(`${prop} foi interceptado`);
                    target[prop] = value;
                    acao(target);
                }
                return Reflect.set(target, prop, value, receiver);
            }
        });
    }

    static _ehFuncao(func) {

        return typeof (func == typeof (Function));
    }
}