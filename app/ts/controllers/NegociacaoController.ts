import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacao, Negociacoes } from '../models/index';

export class NegociacaoController {
    private _inputData: JQuery;
    private _inputQuantidade: JQuery;
    private _inputValor: JQuery;
    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView("#negociacoesView");
    private _mensagemView = new MensagemView('#mensagemView');

    constructor(){
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._negociacoesView.update(this._negociacoes);
    }

    adicionar(event: Event){
        event.preventDefault();

        let data = new Date(this._inputData.val().replace(/-/g, ','));

        if (data.getDay() == diaSemana.Sabado || data.getDay() == diaSemana.Sabado) {
            this._mensagemView.update('Somente negociações em dias úteis, por favor!');
            return
        }
        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );
        
        this._negociacoes.adicionar(negociacao);
        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação adiciona com sucesso!');
        /* apenas teste para popular o Array
        this._negociacoes.paraArray().forEach(negociacao => {
            console.log(negociacao.data);
            console.log(negociacao.quantidade);
            console.log(negociacao.valor);
        });
        console.log(negociacao);*/
    }
}
enum diaSemana {
    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}