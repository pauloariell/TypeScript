class Negociacoes {
    constructor() {
        this._negociacoes = [];
    }
    adicionar(negociacao) {
        this._negociacoes.push(negociacao);
    }
    paraArray() {
        //para evitar alteração direta no array
        return [].concat(this._negociacoes);
    }
}
