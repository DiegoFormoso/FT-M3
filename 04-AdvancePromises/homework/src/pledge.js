'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

class $Promise {
    constructor(executor) {
        if (typeof executor !== "function")
            throw TypeError("executor must be a function");

        this._state = "pending"; 
        this._value = undefined;   
        this._handlerGroups = [];

        const callHandlers = (value) => {
            while (this._handlerGroups.length > 0) {
                const {successCb, errorCb, downstreamPromise} = this._handlerGroups.shift();

                if (this._state === "fulfilled") {
                    if (!successCb) downstreamPromise._internalResolve(value);
                    else {
                        try {
                            const result = successCb(value);   
                            // 1 - una nueva promesa
                            if (result instanceof $Promise) {
                                result.then(
                                    value => downstreamPromise._internalResolve(value),
                                    err => downstreamPromise._internalReject(err) 
                                );
                            }
                            // 2 - retornando un valor
                            else {
                                downstreamPromise._internalResolve(result);
                            }
                            // 3 - arroja el error   
                        }catch (error) {
                           downstreamPromise._internalReject(error);
                        }
                    }

                }

                if (this._state === "rejected") {
                    if (!errorCb) downstreamPromise._internalReject(value);
                    else {
                        try {
                            const result = errorCb(value);

                            if (result instanceof $Promise) {
                                result.then(
                                    value => downstreamPromise._internalResolve(value),
                                    err => downstreamPromise._internalReject(err) 
                                );
                            }
                            // 2 - retornando un valor
                            else {
                                downstreamPromise._internalResolve(result);
                            }
                            // 3 - arroja el error   
                        }catch(error) {
                            downstreamPromise._internalReject(error);
                        }
                    }
                }

                // const currentHandler = this._handlerGroups.shift();
                // this._state === "fulfilled" && currentHandler.successCb && currentHandler.successCb(value);
                // this._state === "rejected" && currentHandler.errorCb && currentHandler.errorCb(value);
            }
        }

        this._internalResolve = (value) => {
            if (this._state !== "pending") return;   
            this._state = "fulfilled";
            this._value = value;
            callHandlers(this._value);
        };

        this._internalReject = (reason) => {
            if (this._state !== "pending") return;   
            this._state = "rejected";
            this._value = reason;
            callHandlers(this._value);
        };

        const resolve = (value) => {
            this._internalResolve(value);
        }

        const reject = (reason) => {
            this._internalReject(reason);
        }

        executor(resolve, reject);

        this.then = (successHandler, errorHadler) => {
            const downstreamPromise = new $Promise(() => {});

            const handlerGroup = {
                successCb: typeof successHandler === "function" ? successHandler : false, 
                errorCb: typeof errorHadler === "function" ? errorHadler : false,
                downstreamPromise
            };
           this._handlerGroups.push(handlerGroup);
           this._state !== "pending" && callHandlers(this._value);

           return downstreamPromise;
        }

        this.catch = (errorHandler) => {
           return this.then(null, errorHandler);
        }

    }

    static resolve(value) {
        if (value instanceof $Promise) return value;
        const newPromise = new $Promise(() => {});
        newPromise._internalResolve(value);
        return newPromise;
    };

    static all(arr) {
        if (!Array.isArray(arr)) throw TypeError("arr must be Array");
    };
}


module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
