var Coffee = require('./coffee-script');

exports.translate = function(load) {
  var output = Coffee.compile(load.source, {
    sourceFiles: [load.address],
    sourceMap: true,
    bare: true
  });
  load.source = output.js;
  load.metadata.sourceMap = JSON.parse(output.v3SourceMap);
};
