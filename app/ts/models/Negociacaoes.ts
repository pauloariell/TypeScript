import { Negociacao } from './index';
export class Negociacoes {
    private _negociacoes: Negociacao[] = [];

    adicionar(negociacao: Negociacao): void {
        this._negociacoes.push(negociacao);
    }
    paraArray(): Negociacao[] {
        //para evitar alteração direta no array
        return [].concat(this._negociacoes);
    }
}