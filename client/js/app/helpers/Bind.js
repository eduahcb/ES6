class Bind {

    constructor(model, view, ...props) {
        
        let proxy = ProxyFactory.create(model, model => view.update(model), props);
        
        view.update(model);

        return proxy;
    } 

}