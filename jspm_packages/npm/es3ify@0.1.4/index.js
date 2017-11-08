/* */ 
(function(process) {
  var Syntax = require('esprima-fb').Syntax;
  var jstransform = require('jstransform');
  var through = require('through');
  var utils = require('jstransform/src/utils');
  var reserved = ["break", "case", "catch", "continue", "default", "delete", "do", "else", "finally", "for", "function", "if", "in", "instanceof", "new", "return", "switch", "this", "throw", "try", "typeof", "var", "void", "while", "with", "abstract", "boolean", "byte", "char", "class", "const", "debugger", "double", "enum", "export", "extends", "final", "float", "goto", "implements", "import", "int", "interface", "long", "native", "package", "private", "protected", "public", "short", "static", "super", "synchronized", "throws", "transient", "volatile"];
  var reservedDict = {};
  reserved.forEach(function(k) {
    reservedDict[k] = true;
  });
  function visitMemberExpression(traverse, node, path, state) {
    traverse(node.object, path, state);
    utils.catchup(node.object.range[1], state);
    utils.append('[', state);
    utils.catchupWhiteSpace(node.property.range[0], state);
    utils.append('"', state);
    utils.catchup(node.property.range[1], state);
    utils.append('"]', state);
    return false;
  }
  visitMemberExpression.test = function(node, path, state) {
    return node.type === Syntax.MemberExpression && node.property.type === Syntax.Identifier && reservedDict[node.property.name] === true;
  };
  function visitProperty(traverse, node, path, state) {
    utils.catchup(node.key.range[0], state);
    utils.append('"', state);
    utils.catchup(node.key.range[1], state);
    utils.append('"', state);
    utils.catchup(node.value.range[0], state);
    traverse(node.value, path, state);
    return false;
  }
  visitProperty.test = function(node, path, state) {
    return node.type === Syntax.Property && node.key.type === Syntax.Identifier && reservedDict[node.key.name] === true;
  };
  var reCommaOrComment = /,|\/\*.+?\*\/|\/\/[^\n]+/g;
  function stripComma(value) {
    return value.replace(reCommaOrComment, function(text) {
      if (text === ',') {
        return '';
      } else {
        return text;
      }
    });
  }
  function visitArrayOrObjectExpression(traverse, node, path, state) {
    utils.catchup(node.range[0] + 1, state);
    var elements = node.type === Syntax.ArrayExpression ? node.elements : node.properties;
    elements.forEach(function(element, i) {
      if (element == null && i === elements.length - 1) {
        throw new Error("Elisions ending an array are interpreted inconsistently " + "in IE8; remove the extra comma or use 'undefined' explicitly");
      }
      if (element != null) {
        utils.catchup(element.range[0], state);
        traverse(element, path, state);
      }
    });
    utils.catchup(node.range[1] - 1, state, stripComma);
    utils.catchup(node.range[1], state);
    return false;
  }
  visitArrayOrObjectExpression.test = function(node, path, state) {
    return node.type === Syntax.ArrayExpression || node.type === Syntax.ObjectExpression;
  };
  var visitorList = [visitMemberExpression, visitProperty, visitArrayOrObjectExpression];
  function transform(code) {
    return jstransform.transform(visitorList, code).code;
  }
  function process(file) {
    if (/\.json$/.test(file))
      return through();
    var data = '';
    function write(chunk) {
      data += chunk;
    }
    function compile() {
      var source;
      try {
        source = transform(data);
      } catch (e) {
        return this.emit('error', e);
      }
      this.queue(source);
      this.queue(null);
    }
    return through(write, compile);
  }
  module.exports = process;
  module.exports.isReserved = function(word) {
    return reservedDict.hasOwnProperty(word) ? !!reservedDict[word] : false;
  };
  module.exports.transform = transform;
  module.exports.visitorList = visitorList;
})(require('process'));
