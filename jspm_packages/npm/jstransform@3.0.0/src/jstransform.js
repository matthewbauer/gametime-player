/* */ 
"use strict";
var esprima = require('esprima-fb');
var utils = require('./utils');
var Syntax = esprima.Syntax;
function _nodeIsClosureScopeBoundary(node, parentNode) {
  if (node.type === Syntax.Program) {
    return true;
  }
  var parentIsFunction = parentNode.type === Syntax.FunctionDeclaration || parentNode.type === Syntax.FunctionExpression;
  return node.type === Syntax.BlockStatement && parentIsFunction;
}
function _nodeIsBlockScopeBoundary(node, parentNode) {
  if (node.type === Syntax.Program) {
    return false;
  }
  return node.type === Syntax.BlockStatement && parentNode.type === Syntax.CatchClause;
}
function traverse(node, path, state) {
  var parentNode = path[0];
  if (!Array.isArray(node) && state.localScope.parentNode !== parentNode) {
    if (_nodeIsClosureScopeBoundary(node, parentNode)) {
      var scopeIsStrict = state.scopeIsStrict || node.body.length > 0 && node.body[0].type === Syntax.ExpressionStatement && node.body[0].expression.type === Syntax.Literal && node.body[0].expression.value === 'use strict';
      if (node.type === Syntax.Program) {
        state = utils.updateState(state, {scopeIsStrict: scopeIsStrict});
      } else {
        state = utils.updateState(state, {
          localScope: {
            parentNode: parentNode,
            parentScope: state.localScope,
            identifiers: {}
          },
          scopeIsStrict: scopeIsStrict
        });
        state.localScope.identifiers['arguments'] = true;
        if (parentNode.params.length > 0) {
          var param;
          for (var i = 0; i < parentNode.params.length; i++) {
            param = parentNode.params[i];
            if (param.type === Syntax.Identifier) {
              state.localScope.identifiers[param.name] = true;
            }
          }
        }
        if (parentNode.type === Syntax.FunctionExpression && parentNode.id) {
          state.localScope.identifiers[parentNode.id.name] = true;
        }
      }
      collectClosureIdentsAndTraverse(node, path, state);
    }
    if (_nodeIsBlockScopeBoundary(node, parentNode)) {
      state = utils.updateState(state, {localScope: {
          parentNode: parentNode,
          parentScope: state.localScope,
          identifiers: {}
        }});
      if (parentNode.type === Syntax.CatchClause) {
        state.localScope.identifiers[parentNode.param.name] = true;
      }
      collectBlockIdentsAndTraverse(node, path, state);
    }
  }
  function traverser(node, path, state) {
    node.range && utils.catchup(node.range[0], state);
    traverse(node, path, state);
    node.range && utils.catchup(node.range[1], state);
  }
  utils.analyzeAndTraverse(walker, traverser, node, path, state);
}
function collectClosureIdentsAndTraverse(node, path, state) {
  utils.analyzeAndTraverse(visitLocalClosureIdentifiers, collectClosureIdentsAndTraverse, node, path, state);
}
function collectBlockIdentsAndTraverse(node, path, state) {
  utils.analyzeAndTraverse(visitLocalBlockIdentifiers, collectBlockIdentsAndTraverse, node, path, state);
}
function visitLocalClosureIdentifiers(node, path, state) {
  var identifiers = state.localScope.identifiers;
  switch (node.type) {
    case Syntax.FunctionExpression:
      return false;
    case Syntax.ClassDeclaration:
    case Syntax.ClassExpression:
    case Syntax.FunctionDeclaration:
      if (node.id) {
        identifiers[node.id.name] = true;
      }
      return false;
    case Syntax.VariableDeclarator:
      if (path[0].kind === 'var') {
        identifiers[node.id.name] = true;
      }
      break;
  }
}
function visitLocalBlockIdentifiers(node, path, state) {
  if (node.type === Syntax.CatchClause) {
    return false;
  }
}
function walker(node, path, state) {
  var visitors = state.g.visitors;
  for (var i = 0; i < visitors.length; i++) {
    if (visitors[i].test(node, path, state)) {
      return visitors[i](traverse, node, path, state);
    }
  }
}
function transform(visitors, source, options) {
  options = options || {};
  var ast;
  try {
    ast = esprima.parse(source, {
      comment: true,
      loc: true,
      range: true
    });
  } catch (e) {
    e.message = 'Parse Error: ' + e.message;
    throw e;
  }
  var state = utils.createState(source, ast, options);
  state.g.visitors = visitors;
  if (options.sourceMap) {
    var SourceMapGenerator = require('source-map').SourceMapGenerator;
    state.g.sourceMap = new SourceMapGenerator({file: 'transformed.js'});
  }
  traverse(ast, [], state);
  utils.catchup(source.length, state);
  var ret = {code: state.g.buffer};
  if (options.sourceMap) {
    ret.sourceMap = state.g.sourceMap;
    ret.sourceMapFilename = options.filename || 'source.js';
  }
  return ret;
}
exports.transform = transform;
