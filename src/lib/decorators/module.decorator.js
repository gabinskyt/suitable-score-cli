/**
 * Provides the mechanism for injecting controllers and providers to the module via decorator
 * 
 * Notes: This own made Module decorator makes use of the decorator pattern to provide a easy way to
 * define multiple Modules, every one with multiple controllers and it's corresponding service, using dependency injection
 * to have the current service and injectable instance shared between the controllers
 * 
 * @param props 
 */
export const Module = ({ controllers, providers }) => {
    return function decorator(Class){
        class ModuleClass extends Class {
            injectables = {};
            providers = {};
            controllers = {};

            constructor(...args) {
                super();
                let { injectables } = args[0];

                if(injectables !== undefined){
                    injectables.forEach(injectable => 
                        this.injectables[injectable.provide.name] =
                            injectable.useValue
                    );
                }

                providers.forEach(Provider => {
                    let provider = new Provider(this.injectables);
                    this.providers[provider.constructor.name] = provider;
                });

                controllers.map(Controller => { 
                    let controller = new Controller({...this.injectables, ...this.providers});
                    this.controllers[controller.constructor.name] = controller;
                });
            }
        } 

        return (...args) => {
            return new ModuleClass(...args);
        }
    };
}