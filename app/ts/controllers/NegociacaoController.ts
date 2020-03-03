import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacao, Negociacoes, NegociacaoParcial } from '../models/index';
import { LogExecTime, domInject, throttle} from '../helpers/Decorators/index';
import { NegociacaoService} from '../services/index';

export class NegociacaoController {
    @domInject('#data')
    private _inputData: JQuery;

    @domInject('#quantidade')
    private _inputQuantidade: JQuery;

    @domInject('#valor')
    private _inputValor: JQuery;

    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView("#negociacoesView");
    private _mensagemView = new MensagemView('#mensagemView');

    private _service = new NegociacaoService();

    constructor() {
        /*this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');*/
        this._negociacoesView.update(this._negociacoes);
    }

    @LogExecTime(true)
    @throttle()
    adicionar(event: Event) {
        const t1 = performance.now();

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

        /**  apenas teste para popular o Array
        *this._negociacoes.paraArray().forEach(negociacao => {
        *    console.log(negociacao.data);
        *    console.log(negociacao.quantidade);
        *    console.log(negociacao.valor);
        *});
        *console.log(negociacao);
        */
        const t2 = performance.now();
        console.log(`Tempo de add é de ${t2 - t1} ms`);
    }

    @throttle()
    dataImport() {
        this._service
            .obterNegociacoes(res => {
                if (res.ok) {
                    return res;
                } else {
                    throw new Error(res.statusText);
                }
            })
            .then(Negociacoes => {
                Negociacoes.forEach(Negociacao =>
                    this._negociacoes.adicionar(Negociacao));

                this._negociacoesView.update(this._negociacoes);
            });
        // fetch('http://localhost:8080/dados')
        //     .then(res => isOk(res))
        //     .then(res => res.json())
        //     .then((dado: NegociacaoParcial[]) => {
        //         dado
        //             .map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
        //             .forEach(negociacao => this._negociacoes.adicionar(negociacao))
        //         this._negociacoesView.update(this._negociacoes);
        //     })
        //     .catch(err => console.log(err));
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