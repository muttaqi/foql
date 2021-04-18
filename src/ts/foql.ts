const loader = require("../../node_modules/assemblyscript/lib/loader/index");

var __getString;
var __newString;
var __getArray;
var __newArray;
var __pin;
var __unpin;

const imports = {
    query: {
        log: (msgPtr) => {
            // at the time of call, wasmExample will be initialized
            console.log('WASM is talking', this.__getString(msgPtr));
        }
    },
    env: {
      memory: new WebAssembly.Memory({ initial: 1024 }),
      table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' })
    }
};

loader.instantiate(fetch("driver.wasm"), imports)
    .then((module) => {
        

        this.__getString = module.exports.__getString;
        this.__newString = module.exports.__newString;
        this.__getArray = module.exports.__getArray;
        this.__newArray = module.exports.__newArray;
        this.__pin = module.exports.__pin;
        this.__unpin = module.exports.__unpin;
    });