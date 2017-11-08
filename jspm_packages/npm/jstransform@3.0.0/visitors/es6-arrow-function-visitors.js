/* */ 
var restParamVisitors = require('./es6-rest-param-visitors');
var Syntax = require('esprima-fb').Syntax;
var utils = require('../src/utils');
function visitArrowFunction(traverse, node, path, state) {
  utils.append('function', state);
  renderParams(node, state);
  utils.catchupWhiteSpace(node.body.range[0], state);
  var renderBody = node.body.type == Syntax.BlockStatement ? renderStatementBody : renderExpressionBody;
  path.unshift(node);
  renderBody(traverse, node, path, state);
  path.shift();
  if (utils.containsChildOfType(node.body, Syntax.ThisExpression)) {
    utils.append('.bind(this)', state);
  }
  return false;
}
function renderParams(node, state) {
  if (isParensFreeSingleParam(node, state) || !node.params.length) {
    utils.append('(', state);
  }
  if (node.params.length !== 0) {
    utils.catchup(node.params[node.params.length - 1].range[1], state);
  }
  utils.append(')', state);
}
function isParensFreeSingleParam(node, state) {
  return node.params.length === 1 && state.g.source[state.g.position] !== '(';
}
function renderExpressionBody(traverse, node, path, state) {
  utils.append('{', state);
  if (node.rest) {
    utils.append(restParamVisitors.renderRestParamSetup(node), state);
  }
  utils.append('return ', state);
  renderStatementBody(traverse, node, path, state);
  utils.append(';}', state);
}
function renderStatementBody(traverse, node, path, state) {
  traverse(node.body, path, state);
  utils.catchup(node.body.range[1], state);
}
visitArrowFunction.test = function(node, path, state) {
  return node.type === Syntax.ArrowFunctionExpression;
};
exports.visitorList = [visitArrowFunction];
