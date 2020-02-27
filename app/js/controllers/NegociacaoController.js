System.register(["../views/index", "../models/index"], function (exports_1, context_1) {
    "use strict";
    var index_1, index_2, NegociacaoController, diaSemana;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            }
        ],
        execute: function () {
            NegociacaoController = class NegociacaoController {
                constructor() {
                    this._negociacoes = new index_2.Negociacoes();
                    this._negociacoesView = new index_1.NegociacoesView("#negociacoesView");
                    this._mensagemView = new index_1.MensagemView('#mensagemView');
                    this._inputData = $('#data');
                    this._inputQuantidade = $('#quantidade');
                    this._inputValor = $('#valor');
                    this._negociacoesView.update(this._negociacoes);
                }
                adicionar(event) {
                    event.preventDefault();
                    let data = new Date(this._inputData.val().replace(/-/g, ','));
                    if (data.getDay() == diaSemana.Sabado || data.getDay() == diaSemana.Sabado) {
                        this._mensagemView.update('Somente negociações em dias úteis, por favor!');
                        return;
                    }
                    const negociacao = new index_2.Negociacao(data, parseInt(this._inputQuantidade.val()), parseFloat(this._inputValor.val()));
                    this._negociacoes.adicionar(negociacao);
                    this._negociacoesView.update(this._negociacoes);
                    this._mensagemView.update('Negociação adiciona com sucesso!');
                }
            };
            exports_1("NegociacaoController", NegociacaoController);
            (function (diaSemana) {
                diaSemana[diaSemana["Domingo"] = 0] = "Domingo";
                diaSemana[diaSemana["Segunda"] = 1] = "Segunda";
                diaSemana[diaSemana["Terca"] = 2] = "Terca";
                diaSemana[diaSemana["Quarta"] = 3] = "Quarta";
                diaSemana[diaSemana["Quinta"] = 4] = "Quinta";
                diaSemana[diaSemana["Sexta"] = 5] = "Sexta";
                diaSemana[diaSemana["Sabado"] = 6] = "Sabado";
            })(diaSemana || (diaSemana = {}));
        }
    };
});
