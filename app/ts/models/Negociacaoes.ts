class Negociacoes {
    private _negociacoes: Negociacao[] = [];

    adicionar(negociacao: Negociacao) {
        this._negociacoes.push(negociacao);
    }
    paraArray() {
        return this._negociacoes;
    }
}