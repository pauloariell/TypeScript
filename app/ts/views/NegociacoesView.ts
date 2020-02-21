class NegociacoesView {
    private _elemento: Element;

    constructor(seletor: string){
        this._elemento = document.querySelector(seletor);
    };

    update(model: Negociacoes): void {
        this._elemento.innerHTML = this.template(model);
    };

    template(model:Negociacoes): string {
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
            </tbody>

            <tfoot>
            </tfoot>
        </table>
        `;
    };
}