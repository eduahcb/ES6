class NegociacoesView extends View {

    constructor(elemento){
        super(elemento);
    }

    template(model) {
        
        return `
        
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>
            <tbody>
                ${model.negociacoes.map( n => `

                    <tr>
                        <td onclick="negociacaoController.ordena('data')" >${DateHelper.dataParaTexto(n.data)}</td>
                        <td onclick="negociacaoController.ordena('quantidade')">${n.quantidade}</td>
                        <td onclick="negociacaoController.ordena('valor')">${n.valor}</td>
                        <td onclick="negociacaoController.ordena('volume')">${n.volume}</td>
                    <tr>
                
                `).join('')}
            </tbody>
                <td colspan="3"></td>
                <td>${model.volumeTotal}</td>
            <tfoot>
            </tfoot>
        </table>
        
        `
    }
}