import { NegociacaoController } from './controllers/index'
const controller = new NegociacaoController();
$('.form').submit(controller.adicionar.bind(controller));
$('#btnImport').click(controller.dataImport.bind(controller));