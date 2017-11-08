/* */ 
(function(process) {
  var types = require('./lib/types');
  var parse = require('./lib/parser').parse;
  var Printer = require('./lib/printer').Printer;
  function print(node, options) {
    return new Printer(options).print(node);
  }
  function prettyPrint(node, options) {
    return new Printer(options).printGenerically(node);
  }
  function run(transformer, options) {
    return runFile(process.argv[2], transformer, options);
  }
  function runFile(path, transformer, options) {
    require('@empty').readFile(path, "utf-8", function(err, code) {
      if (err) {
        console.error(err);
        return;
      }
      runString(code, transformer, options);
    });
  }
  function defaultWriteback(output) {
    process.stdout.write(output);
  }
  function runString(code, transformer, options) {
    var writeback = options && options.writeback || defaultWriteback;
    transformer(parse(code, options), function(node) {
      writeback(print(node, options).code);
    });
  }
  Object.defineProperties(exports, {
    parse: {
      enumerable: true,
      value: parse
    },
    visit: {
      enumerable: true,
      value: types.visit
    },
    print: {
      enumerable: true,
      value: print
    },
    prettyPrint: {
      enumerable: false,
      value: prettyPrint
    },
    types: {
      enumerable: false,
      value: types
    },
    run: {
      enumerable: false,
      value: run
    }
  });
})(require('process'));
