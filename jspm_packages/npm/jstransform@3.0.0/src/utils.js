/* */ 
(function(Buffer, process) {
  function createState(source, rootNode, transformOptions) {
    return {
      localScope: {
        parentNode: rootNode,
        parentScope: null,
        identifiers: {}
      },
      superClass: null,
      mungeNamespace: '',
      methodFuncNode: null,
      className: null,
      scopeIsStrict: null,
      g: {
        opts: transformOptions,
        position: 0,
        buffer: '',
        indentBy: 0,
        source: source,
        docblock: null,
        tagNamespaceUsed: false,
        isBolt: undefined,
        sourceMap: null,
        sourceMapFilename: 'source.js',
        sourceLine: 1,
        bufferLine: 1,
        originalProgramAST: null,
        sourceColumn: 0,
        bufferColumn: 0
      }
    };
  }
  function updateState(state, update) {
    var ret = Object.create(state);
    Object.keys(update).forEach(function(updatedKey) {
      ret[updatedKey] = update[updatedKey];
    });
    return ret;
  }
  function catchup(end, state, contentTransformer) {
    if (end < state.g.position) {
      return;
    }
    var source = state.g.source.substring(state.g.position, end);
    var transformed = updateIndent(source, state);
    if (state.g.sourceMap && transformed) {
      state.g.sourceMap.addMapping({
        generated: {
          line: state.g.bufferLine,
          column: state.g.bufferColumn
        },
        original: {
          line: state.g.sourceLine,
          column: state.g.sourceColumn
        },
        source: state.g.sourceMapFilename
      });
      var sourceLines = source.split('\n');
      var transformedLines = transformed.split('\n');
      for (var i = 1; i < sourceLines.length - 1; i++) {
        state.g.sourceMap.addMapping({
          generated: {
            line: state.g.bufferLine,
            column: 0
          },
          original: {
            line: state.g.sourceLine,
            column: 0
          },
          source: state.g.sourceMapFilename
        });
        state.g.sourceLine++;
        state.g.bufferLine++;
      }
      if (sourceLines.length > 1) {
        state.g.sourceLine++;
        state.g.bufferLine++;
        state.g.sourceColumn = 0;
        state.g.bufferColumn = 0;
      }
      state.g.sourceColumn += sourceLines[sourceLines.length - 1].length;
      state.g.bufferColumn += transformedLines[transformedLines.length - 1].length;
    }
    state.g.buffer += contentTransformer ? contentTransformer(transformed) : transformed;
    state.g.position = end;
  }
  var reNonWhite = /(\S)/g;
  function stripNonWhite(value) {
    return value.replace(reNonWhite, function() {
      return '';
    });
  }
  function catchupWhiteSpace(end, state) {
    catchup(end, state, stripNonWhite);
  }
  var reNonNewline = /[^\n]/g;
  function stripNonNewline(value) {
    return value.replace(reNonNewline, function() {
      return '';
    });
  }
  function catchupNewlines(end, state) {
    catchup(end, state, stripNonNewline);
  }
  function move(end, state) {
    if (state.g.sourceMap) {
      if (end < state.g.position) {
        state.g.position = 0;
        state.g.sourceLine = 1;
        state.g.sourceColumn = 0;
      }
      var source = state.g.source.substring(state.g.position, end);
      var sourceLines = source.split('\n');
      if (sourceLines.length > 1) {
        state.g.sourceLine += sourceLines.length - 1;
        state.g.sourceColumn = 0;
      }
      state.g.sourceColumn += sourceLines[sourceLines.length - 1].length;
    }
    state.g.position = end;
  }
  function append(str, state) {
    if (state.g.sourceMap && str) {
      state.g.sourceMap.addMapping({
        generated: {
          line: state.g.bufferLine,
          column: state.g.bufferColumn
        },
        original: {
          line: state.g.sourceLine,
          column: state.g.sourceColumn
        },
        source: state.g.sourceMapFilename
      });
      var transformedLines = str.split('\n');
      if (transformedLines.length > 1) {
        state.g.bufferLine += transformedLines.length - 1;
        state.g.bufferColumn = 0;
      }
      state.g.bufferColumn += transformedLines[transformedLines.length - 1].length;
    }
    state.g.buffer += str;
  }
  function updateIndent(str, state) {
    for (var i = 0; i < -state.g.indentBy; i++) {
      str = str.replace(/(^|\n)( {2}|\t)/g, '$1');
    }
    return str;
  }
  function indentBefore(start, state) {
    var end = start;
    start = start - 1;
    while (start > 0 && state.g.source[start] != '\n') {
      if (!state.g.source[start].match(/[ \t]/)) {
        end = start;
      }
      start--;
    }
    return state.g.source.substring(start + 1, end);
  }
  function getDocblock(state) {
    if (!state.g.docblock) {
      var docblock = require('./docblock');
      state.g.docblock = docblock.parseAsObject(docblock.extract(state.g.source));
    }
    return state.g.docblock;
  }
  function identWithinLexicalScope(identName, state, stopBeforeNode) {
    var currScope = state.localScope;
    while (currScope) {
      if (currScope.identifiers[identName] !== undefined) {
        return true;
      }
      if (stopBeforeNode && currScope.parentNode === stopBeforeNode) {
        break;
      }
      currScope = currScope.parentScope;
    }
    return false;
  }
  function identInLocalScope(identName, state) {
    return state.localScope.identifiers[identName] !== undefined;
  }
  function declareIdentInLocalScope(identName, state) {
    state.localScope.identifiers[identName] = true;
  }
  function analyzeAndTraverse(analyzer, traverser, node, path, state) {
    var key,
        child;
    if (node.type) {
      if (analyzer(node, path, state) === false) {
        return;
      }
      path.unshift(node);
    }
    for (key in node) {
      if (key === 'range' || key === 'loc') {
        continue;
      }
      if (node.hasOwnProperty(key)) {
        child = node[key];
        if (typeof child === 'object' && child !== null) {
          traverser(child, path, state);
        }
      }
    }
    node.type && path.shift();
  }
  function containsChildOfType(node, type) {
    var foundMatchingChild = false;
    function nodeTypeAnalyzer(node) {
      if (node.type === type) {
        foundMatchingChild = true;
        return false;
      }
    }
    function nodeTypeTraverser(child, path, state) {
      if (!foundMatchingChild) {
        foundMatchingChild = containsChildOfType(child, type);
      }
    }
    analyzeAndTraverse(nodeTypeAnalyzer, nodeTypeTraverser, node, []);
    return foundMatchingChild;
  }
  exports.append = append;
  exports.catchup = catchup;
  exports.catchupWhiteSpace = catchupWhiteSpace;
  exports.catchupNewlines = catchupNewlines;
  exports.containsChildOfType = containsChildOfType;
  exports.createState = createState;
  exports.declareIdentInLocalScope = declareIdentInLocalScope;
  exports.getDocblock = getDocblock;
  exports.identWithinLexicalScope = identWithinLexicalScope;
  exports.identInLocalScope = identInLocalScope;
  exports.indentBefore = indentBefore;
  exports.move = move;
  exports.updateIndent = updateIndent;
  exports.updateState = updateState;
  exports.analyzeAndTraverse = analyzeAndTraverse;
})(require('buffer').Buffer, require('process'));
