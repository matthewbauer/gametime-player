/* */ 
var assert = require('assert');
var types = require('./types');
var n = types.namedTypes;
var b = types.builders;
var isObject = types.builtInTypes.object;
var isArray = types.builtInTypes.array;
var isFunction = types.builtInTypes.function;
var Patcher = require('./patcher').Patcher;
var normalizeOptions = require('./options').normalize;
var fromString = require('./lines').fromString;
var attachComments = require('./comments').attach;
var util = require('./util');
exports.parse = function parse(source, options) {
  options = normalizeOptions(options);
  var lines = fromString(source, options);
  var sourceWithoutTabs = lines.toString({
    tabWidth: options.tabWidth,
    reuseWhitespace: false,
    useTabs: false
  });
  var comments = [];
  var program = options.parser.parse(sourceWithoutTabs, {
    loc: true,
    locations: true,
    range: options.range,
    comment: true,
    onComment: comments,
    tolerant: options.tolerant,
    ecmaVersion: 6,
    sourceType: 'module'
  });
  util.fixFaultyLocations(program, lines);
  program.loc = program.loc || {
    start: lines.firstPos(),
    end: lines.lastPos()
  };
  program.loc.lines = lines;
  program.loc.indent = 0;
  var trueProgramLoc = util.getTrueLoc(program, lines);
  program.loc.start = trueProgramLoc.start;
  program.loc.end = trueProgramLoc.end;
  if (program.comments) {
    comments = program.comments;
    delete program.comments;
  }
  var file = program;
  if (file.type === "Program") {
    var file = b.file(program);
    file.loc = {
      lines: lines,
      indent: 0,
      start: lines.firstPos(),
      end: lines.lastPos()
    };
  } else if (file.type === "File") {
    program = file.program;
  }
  attachComments(comments, program.body.length ? file.program : file, lines);
  return new TreeCopier(lines).copy(file);
};
function TreeCopier(lines) {
  assert.ok(this instanceof TreeCopier);
  this.lines = lines;
  this.indent = 0;
}
var TCp = TreeCopier.prototype;
TCp.copy = function(node) {
  if (isArray.check(node)) {
    return node.map(this.copy, this);
  }
  if (!isObject.check(node)) {
    return node;
  }
  util.fixFaultyLocations(node, this.lines);
  var copy = Object.create(Object.getPrototypeOf(node), {original: {
      value: node,
      configurable: false,
      enumerable: false,
      writable: true
    }});
  var loc = node.loc;
  var oldIndent = this.indent;
  var newIndent = oldIndent;
  if (loc) {
    if (node.type === "Block" || node.type === "Line" || this.lines.isPrecededOnlyByWhitespace(loc.start)) {
      newIndent = this.indent = loc.start.column;
    }
    loc.lines = this.lines;
    loc.indent = newIndent;
  }
  var keys = Object.keys(node);
  var keyCount = keys.length;
  for (var i = 0; i < keyCount; ++i) {
    var key = keys[i];
    if (key === "loc") {
      copy[key] = node[key];
    } else {
      copy[key] = this.copy(node[key]);
    }
  }
  this.indent = oldIndent;
  return copy;
};
