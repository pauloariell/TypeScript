export function LogExecTime(inSec: boolean = false){
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const oriMethod = descriptor.value;

        descriptor.value = function(...args: any[]){
            let unid = 'ms';
            let div = 1;

            if (inSec) {
                unid = 's';
                div = 1000;
            }

            console.log('-----------------------------');
            console.log(`Os parametros passado para o metodo ${propertyKey}: ${JSON.stringify(args)}`);
            const t1 = performance.now();
            const retorno = oriMethod.apply(this,args);
            const t2 = performance.now();
            console.log(`O retorno do metodo ${propertyKey} é ${JSON.stringify(retorno)}`);
            console.log(`O metodo ${propertyKey} demorou ${(t2-t1)/div} ${unid}`);
            return retorno;
        }
        return descriptor;
    }
}