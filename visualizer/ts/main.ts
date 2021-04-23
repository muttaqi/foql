import {instantiate} from "../../node_modules/assemblyscript/lib/loader/index";

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

var visualize;

var __getString;
var __newString;
var __getArray;
var __newArray;
var __pin;
var __unpin;

var imports = {
    env: {
      memory: new WebAssembly.Memory({ initial: 1024 }),
      table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' })
    }
};

instantiate(fetch("visualizer.wasm"), imports)
    .then((module) => {
        visualize = module.exports.visualize;

        __getString = module.exports.__getString;
        __newString = module.exports.__newString;
        __getArray = module.exports.__getArray;
        __newArray = module.exports.__newArray;
        __pin = module.exports.__pin;
        __unpin = module.exports.__unpin;
    });
   
readline.question('Enter a text:', text => {
    console.log(visualize(text));
    readline.close();
});