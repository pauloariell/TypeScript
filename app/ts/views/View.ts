import { LogExecTime } from '../helpers/Decorators/index';
export abstract class View<T> {
    protected _elemento: JQuery;
    private _escapar: boolean;
    
    constructor(selector: string, escapar: boolean = false){
        this._elemento = $(selector);
        this._escapar = escapar;
    }
    @LogExecTime()
    update(model: T): void {
        let template = this.template(model);
        if(this._escapar) 
            template = template.replace(/<script>[\s\S]*?<\/script>/, '');

        this._elemento.html(template);
        //this._elemento.html(this.template(model));
    }
    abstract template(model: T): string;
}