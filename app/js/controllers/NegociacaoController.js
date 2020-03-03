System.register(["../views/index", "../models/index", "../helpers/Decorators/index", "../services/index"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var index_1, index_2, index_3, index_4, NegociacaoController, diaSemana;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            },
            function (index_3_1) {
                index_3 = index_3_1;
            },
            function (index_4_1) {
                index_4 = index_4_1;
            }
        ],
        execute: function () {
            NegociacaoController = class NegociacaoController {
                constructor() {
                    this._negociacoes = new index_2.Negociacoes();
                    this._negociacoesView = new index_1.NegociacoesView("#negociacoesView");
                    this._mensagemView = new index_1.MensagemView('#mensagemView');
                    this._service = new index_4.NegociacaoService();
                    this._negociacoesView.update(this._negociacoes);
                }
                adicionar(event) {
                    const t1 = performance.now();
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
                    const t2 = performance.now();
                    console.log(`Tempo de add é de ${t2 - t1} ms`);
                }
                dataImport() {
                    this._service
                        .obterNegociacoes(res => {
                        if (res.ok) {
                            return res;
                        }
                        else {
                            throw new Error(res.statusText);
                        }
                    })
                        .then(Negociacoes => {
                        Negociacoes.forEach(Negociacao => this._negociacoes.adicionar(Negociacao));
                        this._negociacoesView.update(this._negociacoes);
                    });
                }
            };
            __decorate([
                index_3.domInject('#data')
            ], NegociacaoController.prototype, "_inputData", void 0);
            __decorate([
                index_3.domInject('#quantidade')
            ], NegociacaoController.prototype, "_inputQuantidade", void 0);
            __decorate([
                index_3.domInject('#valor')
            ], NegociacaoController.prototype, "_inputValor", void 0);
            __decorate([
                index_3.LogExecTime(true),
                index_3.throttle()
            ], NegociacaoController.prototype, "adicionar", null);
            __decorate([
                index_3.throttle()
            ], NegociacaoController.prototype, "dataImport", null);
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
