export function throttle(ms: number = 500){
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const oriMethod = descriptor.value;
        let timer = 0;
        descriptor.value = function(...args: any[]){
            if(event) event.preventDefault();
            clearTimeout(timer);
            timer = setTimeout(() => oriMethod.apply(this,args), ms);
        }
        return descriptor;
    }
}