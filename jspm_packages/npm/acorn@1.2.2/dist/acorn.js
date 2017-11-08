/* */ 
"format cjs";
(function(process) {
  (function(f) {
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = f();
    } else if (typeof define === "function" && define.amd) {
      define([], f);
    } else {
      var g;
      if (typeof window !== "undefined") {
        g = window;
      } else if (typeof global !== "undefined") {
        g = global;
      } else if (typeof self !== "undefined") {
        g = self;
      } else {
        g = this;
      }
      g.acorn = f();
    }
  })(function() {
    var define,
        module,
        exports;
    return (function e(t, n, r) {
      function s(o, u) {
        if (!n[o]) {
          if (!t[o]) {
            var a = typeof require == "function" && require;
            if (!u && a)
              return a(o, !0);
            if (i)
              return i(o, !0);
            var f = new Error("Cannot find module '" + o + "'");
            throw f.code = "MODULE_NOT_FOUND", f;
          }
          var l = n[o] = {exports: {}};
          t[o][0].call(l.exports, function(e) {
            var n = t[o][1][e];
            return s(n ? n : e);
          }, l, l.exports, e, t, n, r);
        }
        return n[o].exports;
      }
      var i = typeof require == "function" && require;
      for (var o = 0; o < r.length; o++)
        s(r[o]);
      return s;
    })({
      1: [function(_dereq_, module, exports) {
        "use strict";
        exports.parse = parse;
        exports.parseExpressionAt = parseExpressionAt;
        exports.tokenizer = tokenizer;
        exports.__esModule = true;
        var _state = _dereq_("./state");
        var Parser = _state.Parser;
        var _options = _dereq_("./options");
        var getOptions = _options.getOptions;
        _dereq_("./parseutil");
        _dereq_("./statement");
        _dereq_("./lval");
        _dereq_("./expression");
        exports.Parser = _state.Parser;
        exports.plugins = _state.plugins;
        exports.defaultOptions = _options.defaultOptions;
        var _location = _dereq_("./location");
        exports.SourceLocation = _location.SourceLocation;
        exports.getLineInfo = _location.getLineInfo;
        exports.Node = _dereq_("./node").Node;
        var _tokentype = _dereq_("./tokentype");
        exports.TokenType = _tokentype.TokenType;
        exports.tokTypes = _tokentype.types;
        var _tokencontext = _dereq_("./tokencontext");
        exports.TokContext = _tokencontext.TokContext;
        exports.tokContexts = _tokencontext.types;
        var _identifier = _dereq_("./identifier");
        exports.isIdentifierChar = _identifier.isIdentifierChar;
        exports.isIdentifierStart = _identifier.isIdentifierStart;
        exports.Token = _dereq_("./tokenize").Token;
        var _whitespace = _dereq_("./whitespace");
        exports.isNewLine = _whitespace.isNewLine;
        exports.lineBreak = _whitespace.lineBreak;
        exports.lineBreakG = _whitespace.lineBreakG;
        var version = "1.2.2";
        exports.version = version;
        function parse(input, options) {
          var p = parser(options, input);
          var startPos = p.pos,
              startLoc = p.options.locations && p.curPosition();
          p.nextToken();
          return p.parseTopLevel(p.options.program || p.startNodeAt(startPos, startLoc));
        }
        function parseExpressionAt(input, pos, options) {
          var p = parser(options, input, pos);
          p.nextToken();
          return p.parseExpression();
        }
        function tokenizer(input, options) {
          return parser(options, input);
        }
        function parser(options, input) {
          return new Parser(getOptions(options), String(input));
        }
      }, {
        "./expression": 6,
        "./identifier": 7,
        "./location": 8,
        "./lval": 9,
        "./node": 10,
        "./options": 11,
        "./parseutil": 12,
        "./state": 13,
        "./statement": 14,
        "./tokencontext": 15,
        "./tokenize": 16,
        "./tokentype": 17,
        "./whitespace": 19
      }],
      2: [function(_dereq_, module, exports) {
        if (typeof Object.create === 'function') {
          module.exports = function inherits(ctor, superCtor) {
            ctor.super_ = superCtor;
            ctor.prototype = Object.create(superCtor.prototype, {constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
              }});
          };
        } else {
          module.exports = function inherits(ctor, superCtor) {
            ctor.super_ = superCtor;
            var TempCtor = function() {};
            TempCtor.prototype = superCtor.prototype;
            ctor.prototype = new TempCtor();
            ctor.prototype.constructor = ctor;
          };
        }
      }, {}],
      3: [function(_dereq_, module, exports) {
        var process = module.exports = {};
        var queue = [];
        var draining = false;
        function drainQueue() {
          if (draining) {
            return;
          }
          draining = true;
          var currentQueue;
          var len = queue.length;
          while (len) {
            currentQueue = queue;
            queue = [];
            var i = -1;
            while (++i < len) {
              currentQueue[i]();
            }
            len = queue.length;
          }
          draining = false;
        }
        process.nextTick = function(fun) {
          queue.push(fun);
          if (!draining) {
            setTimeout(drainQueue, 0);
          }
        };
        process.title = 'browser';
        process.browser = true;
        process.env = {};
        process.argv = [];
        process.version = '';
        process.versions = {};
        function noop() {}
        process.on = noop;
        process.addListener = noop;
        process.once = noop;
        process.off = noop;
        process.removeListener = noop;
        process.removeAllListeners = noop;
        process.emit = noop;
        process.binding = function(name) {
          throw new Error('process.binding is not supported');
        };
        process.cwd = function() {
          return '/';
        };
        process.chdir = function(dir) {
          throw new Error('process.chdir is not supported');
        };
        process.umask = function() {
          return 0;
        };
      }, {}],
      4: [function(_dereq_, module, exports) {
        module.exports = function isBuffer(arg) {
          return arg && typeof arg === 'object' && typeof arg.copy === 'function' && typeof arg.fill === 'function' && typeof arg.readUInt8 === 'function';
        };
      }, {}],
      5: [function(_dereq_, module, exports) {
        (function(process, global) {
          var formatRegExp = /%[sdj%]/g;
          exports.format = function(f) {
            if (!isString(f)) {
              var objects = [];
              for (var i = 0; i < arguments.length; i++) {
                objects.push(inspect(arguments[i]));
              }
              return objects.join(' ');
            }
            var i = 1;
            var args = arguments;
            var len = args.length;
            var str = String(f).replace(formatRegExp, function(x) {
              if (x === '%%')
                return '%';
              if (i >= len)
                return x;
              switch (x) {
                case '%s':
                  return String(args[i++]);
                case '%d':
                  return Number(args[i++]);
                case '%j':
                  try {
                    return JSON.stringify(args[i++]);
                  } catch (_) {
                    return '[Circular]';
                  }
                default:
                  return x;
              }
            });
            for (var x = args[i]; i < len; x = args[++i]) {
              if (isNull(x) || !isObject(x)) {
                str += ' ' + x;
              } else {
                str += ' ' + inspect(x);
              }
            }
            return str;
          };
          exports.deprecate = function(fn, msg) {
            if (isUndefined(global.process)) {
              return function() {
                return exports.deprecate(fn, msg).apply(this, arguments);
              };
            }
            if (process.noDeprecation === true) {
              return fn;
            }
            var warned = false;
            function deprecated() {
              if (!warned) {
                if (process.throwDeprecation) {
                  throw new Error(msg);
                } else if (process.traceDeprecation) {
                  console.trace(msg);
                } else {
                  console.error(msg);
                }
                warned = true;
              }
              return fn.apply(this, arguments);
            }
            return deprecated;
          };
          var debugs = {};
          var debugEnviron;
          exports.debuglog = function(set) {
            if (isUndefined(debugEnviron))
              debugEnviron = process.env.NODE_DEBUG || '';
            set = set.toUpperCase();
            if (!debugs[set]) {
              if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
                var pid = process.pid;
                debugs[set] = function() {
                  var msg = exports.format.apply(exports, arguments);
                  console.error('%s %d: %s', set, pid, msg);
                };
              } else {
                debugs[set] = function() {};
              }
            }
            return debugs[set];
          };
          function inspect(obj, opts) {
            var ctx = {
              seen: [],
              stylize: stylizeNoColor
            };
            if (arguments.length >= 3)
              ctx.depth = arguments[2];
            if (arguments.length >= 4)
              ctx.colors = arguments[3];
            if (isBoolean(opts)) {
              ctx.showHidden = opts;
            } else if (opts) {
              exports._extend(ctx, opts);
            }
            if (isUndefined(ctx.showHidden))
              ctx.showHidden = false;
            if (isUndefined(ctx.depth))
              ctx.depth = 2;
            if (isUndefined(ctx.colors))
              ctx.colors = false;
            if (isUndefined(ctx.customInspect))
              ctx.customInspect = true;
            if (ctx.colors)
              ctx.stylize = stylizeWithColor;
            return formatValue(ctx, obj, ctx.depth);
          }
          exports.inspect = inspect;
          inspect.colors = {
            'bold': [1, 22],
            'italic': [3, 23],
            'underline': [4, 24],
            'inverse': [7, 27],
            'white': [37, 39],
            'grey': [90, 39],
            'black': [30, 39],
            'blue': [34, 39],
            'cyan': [36, 39],
            'green': [32, 39],
            'magenta': [35, 39],
            'red': [31, 39],
            'yellow': [33, 39]
          };
          inspect.styles = {
            'special': 'cyan',
            'number': 'yellow',
            'boolean': 'yellow',
            'undefined': 'grey',
            'null': 'bold',
            'string': 'green',
            'date': 'magenta',
            'regexp': 'red'
          };
          function stylizeWithColor(str, styleType) {
            var style = inspect.styles[styleType];
            if (style) {
              return '\u001b[' + inspect.colors[style][0] + 'm' + str + '\u001b[' + inspect.colors[style][1] + 'm';
            } else {
              return str;
            }
          }
          function stylizeNoColor(str, styleType) {
            return str;
          }
          function arrayToHash(array) {
            var hash = {};
            array.forEach(function(val, idx) {
              hash[val] = true;
            });
            return hash;
          }
          function formatValue(ctx, value, recurseTimes) {
            if (ctx.customInspect && value && isFunction(value.inspect) && value.inspect !== exports.inspect && !(value.constructor && value.constructor.prototype === value)) {
              var ret = value.inspect(recurseTimes, ctx);
              if (!isString(ret)) {
                ret = formatValue(ctx, ret, recurseTimes);
              }
              return ret;
            }
            var primitive = formatPrimitive(ctx, value);
            if (primitive) {
              return primitive;
            }
            var keys = Object.keys(value);
            var visibleKeys = arrayToHash(keys);
            if (ctx.showHidden) {
              keys = Object.getOwnPropertyNames(value);
            }
            if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
              return formatError(value);
            }
            if (keys.length === 0) {
              if (isFunction(value)) {
                var name = value.name ? ': ' + value.name : '';
                return ctx.stylize('[Function' + name + ']', 'special');
              }
              if (isRegExp(value)) {
                return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
              }
              if (isDate(value)) {
                return ctx.stylize(Date.prototype.toString.call(value), 'date');
              }
              if (isError(value)) {
                return formatError(value);
              }
            }
            var base = '',
                array = false,
                braces = ['{', '}'];
            if (isArray(value)) {
              array = true;
              braces = ['[', ']'];
            }
            if (isFunction(value)) {
              var n = value.name ? ': ' + value.name : '';
              base = ' [Function' + n + ']';
            }
            if (isRegExp(value)) {
              base = ' ' + RegExp.prototype.toString.call(value);
            }
            if (isDate(value)) {
              base = ' ' + Date.prototype.toUTCString.call(value);
            }
            if (isError(value)) {
              base = ' ' + formatError(value);
            }
            if (keys.length === 0 && (!array || value.length == 0)) {
              return braces[0] + base + braces[1];
            }
            if (recurseTimes < 0) {
              if (isRegExp(value)) {
                return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
              } else {
                return ctx.stylize('[Object]', 'special');
              }
            }
            ctx.seen.push(value);
            var output;
            if (array) {
              output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
            } else {
              output = keys.map(function(key) {
                return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
              });
            }
            ctx.seen.pop();
            return reduceToSingleString(output, base, braces);
          }
          function formatPrimitive(ctx, value) {
            if (isUndefined(value))
              return ctx.stylize('undefined', 'undefined');
            if (isString(value)) {
              var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
              return ctx.stylize(simple, 'string');
            }
            if (isNumber(value))
              return ctx.stylize('' + value, 'number');
            if (isBoolean(value))
              return ctx.stylize('' + value, 'boolean');
            if (isNull(value))
              return ctx.stylize('null', 'null');
          }
          function formatError(value) {
            return '[' + Error.prototype.toString.call(value) + ']';
          }
          function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
            var output = [];
            for (var i = 0,
                l = value.length; i < l; ++i) {
              if (hasOwnProperty(value, String(i))) {
                output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
              } else {
                output.push('');
              }
            }
            keys.forEach(function(key) {
              if (!key.match(/^\d+$/)) {
                output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
              }
            });
            return output;
          }
          function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
            var name,
                str,
                desc;
            desc = Object.getOwnPropertyDescriptor(value, key) || {value: value[key]};
            if (desc.get) {
              if (desc.set) {
                str = ctx.stylize('[Getter/Setter]', 'special');
              } else {
                str = ctx.stylize('[Getter]', 'special');
              }
            } else {
              if (desc.set) {
                str = ctx.stylize('[Setter]', 'special');
              }
            }
            if (!hasOwnProperty(visibleKeys, key)) {
              name = '[' + key + ']';
            }
            if (!str) {
              if (ctx.seen.indexOf(desc.value) < 0) {
                if (isNull(recurseTimes)) {
                  str = formatValue(ctx, desc.value, null);
                } else {
                  str = formatValue(ctx, desc.value, recurseTimes - 1);
                }
                if (str.indexOf('\n') > -1) {
                  if (array) {
                    str = str.split('\n').map(function(line) {
                      return '  ' + line;
                    }).join('\n').substr(2);
                  } else {
                    str = '\n' + str.split('\n').map(function(line) {
                      return '   ' + line;
                    }).join('\n');
                  }
                }
              } else {
                str = ctx.stylize('[Circular]', 'special');
              }
            }
            if (isUndefined(name)) {
              if (array && key.match(/^\d+$/)) {
                return str;
              }
              name = JSON.stringify('' + key);
              if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
                name = name.substr(1, name.length - 2);
                name = ctx.stylize(name, 'name');
              } else {
                name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
                name = ctx.stylize(name, 'string');
              }
            }
            return name + ': ' + str;
          }
          function reduceToSingleString(output, base, braces) {
            var numLinesEst = 0;
            var length = output.reduce(function(prev, cur) {
              numLinesEst++;
              if (cur.indexOf('\n') >= 0)
                numLinesEst++;
              return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
            }, 0);
            if (length > 60) {
              return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
            }
            return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
          }
          function isArray(ar) {
            return Array.isArray(ar);
          }
          exports.isArray = isArray;
          function isBoolean(arg) {
            return typeof arg === 'boolean';
          }
          exports.isBoolean = isBoolean;
          function isNull(arg) {
            return arg === null;
          }
          exports.isNull = isNull;
          function isNullOrUndefined(arg) {
            return arg == null;
          }
          exports.isNullOrUndefined = isNullOrUndefined;
          function isNumber(arg) {
            return typeof arg === 'number';
          }
          exports.isNumber = isNumber;
          function isString(arg) {
            return typeof arg === 'string';
          }
          exports.isString = isString;
          function isSymbol(arg) {
            return typeof arg === 'symbol';
          }
          exports.isSymbol = isSymbol;
          function isUndefined(arg) {
            return arg === void 0;
          }
          exports.isUndefined = isUndefined;
          function isRegExp(re) {
            return isObject(re) && objectToString(re) === '[object RegExp]';
          }
          exports.isRegExp = isRegExp;
          function isObject(arg) {
            return typeof arg === 'object' && arg !== null;
          }
          exports.isObject = isObject;
          function isDate(d) {
            return isObject(d) && objectToString(d) === '[object Date]';
          }
          exports.isDate = isDate;
          function isError(e) {
            return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
          }
          exports.isError = isError;
          function isFunction(arg) {
            return typeof arg === 'function';
          }
          exports.isFunction = isFunction;
          function isPrimitive(arg) {
            return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || typeof arg === 'symbol' || typeof arg === 'undefined';
          }
          exports.isPrimitive = isPrimitive;
          exports.isBuffer = _dereq_('./support/isBuffer');
          function objectToString(o) {
            return Object.prototype.toString.call(o);
          }
          function pad(n) {
            return n < 10 ? '0' + n.toString(10) : n.toString(10);
          }
          var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          function timestamp() {
            var d = new Date();
            var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
            return [d.getDate(), months[d.getMonth()], time].join(' ');
          }
          exports.log = function() {
            console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
          };
          exports.inherits = _dereq_('inherits');
          exports._extend = function(origin, add) {
            if (!add || !isObject(add))
              return origin;
            var keys = Object.keys(add);
            var i = keys.length;
            while (i--) {
              origin[keys[i]] = add[keys[i]];
            }
            return origin;
          };
          function hasOwnProperty(obj, prop) {
            return Object.prototype.hasOwnProperty.call(obj, prop);
          }
        }).call(this, _dereq_('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {
        "./support/isBuffer": 4,
        "_process": 3,
        "inherits": 2
      }],
      6: [function(_dereq_, module, exports) {
        "use strict";
        var tt = _dereq_("./tokentype").types;
        var Parser = _dereq_("./state").Parser;
        var reservedWords = _dereq_("./identifier").reservedWords;
        var has = _dereq_("./util").has;
        var pp = Parser.prototype;
        pp.checkPropClash = function(prop, propHash) {
          if (this.options.ecmaVersion >= 6)
            return;
          var key = prop.key,
              name = undefined;
          switch (key.type) {
            case "Identifier":
              name = key.name;
              break;
            case "Literal":
              name = String(key.value);
              break;
            default:
              return;
          }
          var kind = prop.kind || "init",
              other = undefined;
          if (has(propHash, name)) {
            other = propHash[name];
            var isGetSet = kind !== "init";
            if ((this.strict || isGetSet) && other[kind] || !(isGetSet ^ other.init))
              this.raise(key.start, "Redefinition of property");
          } else {
            other = propHash[name] = {
              init: false,
              get: false,
              set: false
            };
          }
          other[kind] = true;
        };
        pp.parseExpression = function(noIn, refShorthandDefaultPos) {
          var startPos = this.start,
              startLoc = this.startLoc;
          var expr = this.parseMaybeAssign(noIn, refShorthandDefaultPos);
          if (this.type === tt.comma) {
            var node = this.startNodeAt(startPos, startLoc);
            node.expressions = [expr];
            while (this.eat(tt.comma))
              node.expressions.push(this.parseMaybeAssign(noIn, refShorthandDefaultPos));
            return this.finishNode(node, "SequenceExpression");
          }
          return expr;
        };
        pp.parseMaybeAssign = function(noIn, refShorthandDefaultPos, afterLeftParse) {
          if (this.type == tt._yield && this.inGenerator)
            return this.parseYield();
          var failOnShorthandAssign = undefined;
          if (!refShorthandDefaultPos) {
            refShorthandDefaultPos = {start: 0};
            failOnShorthandAssign = true;
          } else {
            failOnShorthandAssign = false;
          }
          var startPos = this.start,
              startLoc = this.startLoc;
          if (this.type == tt.parenL || this.type == tt.name)
            this.potentialArrowAt = this.start;
          var left = this.parseMaybeConditional(noIn, refShorthandDefaultPos);
          if (afterLeftParse)
            left = afterLeftParse.call(this, left, startPos, startLoc);
          if (this.type.isAssign) {
            var node = this.startNodeAt(startPos, startLoc);
            node.operator = this.value;
            node.left = this.type === tt.eq ? this.toAssignable(left) : left;
            refShorthandDefaultPos.start = 0;
            this.checkLVal(left);
            this.next();
            node.right = this.parseMaybeAssign(noIn);
            return this.finishNode(node, "AssignmentExpression");
          } else if (failOnShorthandAssign && refShorthandDefaultPos.start) {
            this.unexpected(refShorthandDefaultPos.start);
          }
          return left;
        };
        pp.parseMaybeConditional = function(noIn, refShorthandDefaultPos) {
          var startPos = this.start,
              startLoc = this.startLoc;
          var expr = this.parseExprOps(noIn, refShorthandDefaultPos);
          if (refShorthandDefaultPos && refShorthandDefaultPos.start)
            return expr;
          if (this.eat(tt.question)) {
            var node = this.startNodeAt(startPos, startLoc);
            node.test = expr;
            node.consequent = this.parseMaybeAssign();
            this.expect(tt.colon);
            node.alternate = this.parseMaybeAssign(noIn);
            return this.finishNode(node, "ConditionalExpression");
          }
          return expr;
        };
        pp.parseExprOps = function(noIn, refShorthandDefaultPos) {
          var startPos = this.start,
              startLoc = this.startLoc;
          var expr = this.parseMaybeUnary(refShorthandDefaultPos);
          if (refShorthandDefaultPos && refShorthandDefaultPos.start)
            return expr;
          return this.parseExprOp(expr, startPos, startLoc, -1, noIn);
        };
        pp.parseExprOp = function(left, leftStartPos, leftStartLoc, minPrec, noIn) {
          var prec = this.type.binop;
          if (Array.isArray(leftStartPos)) {
            if (this.options.locations && noIn === undefined) {
              noIn = minPrec;
              minPrec = leftStartLoc;
              leftStartLoc = leftStartPos[1];
              leftStartPos = leftStartPos[0];
            }
          }
          if (prec != null && (!noIn || this.type !== tt._in)) {
            if (prec > minPrec) {
              var node = this.startNodeAt(leftStartPos, leftStartLoc);
              node.left = left;
              node.operator = this.value;
              var op = this.type;
              this.next();
              var startPos = this.start,
                  startLoc = this.startLoc;
              node.right = this.parseExprOp(this.parseMaybeUnary(), startPos, startLoc, prec, noIn);
              this.finishNode(node, op === tt.logicalOR || op === tt.logicalAND ? "LogicalExpression" : "BinaryExpression");
              return this.parseExprOp(node, leftStartPos, leftStartLoc, minPrec, noIn);
            }
          }
          return left;
        };
        pp.parseMaybeUnary = function(refShorthandDefaultPos) {
          if (this.type.prefix) {
            var node = this.startNode(),
                update = this.type === tt.incDec;
            node.operator = this.value;
            node.prefix = true;
            this.next();
            node.argument = this.parseMaybeUnary();
            if (refShorthandDefaultPos && refShorthandDefaultPos.start)
              this.unexpected(refShorthandDefaultPos.start);
            if (update)
              this.checkLVal(node.argument);
            else if (this.strict && node.operator === "delete" && node.argument.type === "Identifier")
              this.raise(node.start, "Deleting local variable in strict mode");
            return this.finishNode(node, update ? "UpdateExpression" : "UnaryExpression");
          }
          var startPos = this.start,
              startLoc = this.startLoc;
          var expr = this.parseExprSubscripts(refShorthandDefaultPos);
          if (refShorthandDefaultPos && refShorthandDefaultPos.start)
            return expr;
          while (this.type.postfix && !this.canInsertSemicolon()) {
            var node = this.startNodeAt(startPos, startLoc);
            node.operator = this.value;
            node.prefix = false;
            node.argument = expr;
            this.checkLVal(expr);
            this.next();
            expr = this.finishNode(node, "UpdateExpression");
          }
          return expr;
        };
        pp.parseExprSubscripts = function(refShorthandDefaultPos) {
          var startPos = this.start,
              startLoc = this.startLoc;
          var expr = this.parseExprAtom(refShorthandDefaultPos);
          if (refShorthandDefaultPos && refShorthandDefaultPos.start)
            return expr;
          return this.parseSubscripts(expr, startPos, startLoc);
        };
        pp.parseSubscripts = function(base, startPos, startLoc, noCalls) {
          if (Array.isArray(startPos)) {
            if (this.options.locations && noCalls === undefined) {
              noCalls = startLoc;
              startLoc = startPos[1];
              startPos = startPos[0];
            }
          }
          for (; ; ) {
            if (this.eat(tt.dot)) {
              var node = this.startNodeAt(startPos, startLoc);
              node.object = base;
              node.property = this.parseIdent(true);
              node.computed = false;
              base = this.finishNode(node, "MemberExpression");
            } else if (this.eat(tt.bracketL)) {
              var node = this.startNodeAt(startPos, startLoc);
              node.object = base;
              node.property = this.parseExpression();
              node.computed = true;
              this.expect(tt.bracketR);
              base = this.finishNode(node, "MemberExpression");
            } else if (!noCalls && this.eat(tt.parenL)) {
              var node = this.startNodeAt(startPos, startLoc);
              node.callee = base;
              node.arguments = this.parseExprList(tt.parenR, false);
              base = this.finishNode(node, "CallExpression");
            } else if (this.type === tt.backQuote) {
              var node = this.startNodeAt(startPos, startLoc);
              node.tag = base;
              node.quasi = this.parseTemplate();
              base = this.finishNode(node, "TaggedTemplateExpression");
            } else {
              return base;
            }
          }
        };
        pp.parseExprAtom = function(refShorthandDefaultPos) {
          var node = undefined,
              canBeArrow = this.potentialArrowAt == this.start;
          switch (this.type) {
            case tt._this:
            case tt._super:
              var type = this.type === tt._this ? "ThisExpression" : "Super";
              node = this.startNode();
              this.next();
              return this.finishNode(node, type);
            case tt._yield:
              if (this.inGenerator)
                this.unexpected();
            case tt.name:
              var startPos = this.start,
                  startLoc = this.startLoc;
              var id = this.parseIdent(this.type !== tt.name);
              if (canBeArrow && !this.canInsertSemicolon() && this.eat(tt.arrow))
                return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id]);
              return id;
            case tt.regexp:
              var value = this.value;
              node = this.parseLiteral(value.value);
              node.regex = {
                pattern: value.pattern,
                flags: value.flags
              };
              return node;
            case tt.num:
            case tt.string:
              return this.parseLiteral(this.value);
            case tt._null:
            case tt._true:
            case tt._false:
              node = this.startNode();
              node.value = this.type === tt._null ? null : this.type === tt._true;
              node.raw = this.type.keyword;
              this.next();
              return this.finishNode(node, "Literal");
            case tt.parenL:
              return this.parseParenAndDistinguishExpression(canBeArrow);
            case tt.bracketL:
              node = this.startNode();
              this.next();
              if (this.options.ecmaVersion >= 7 && this.type === tt._for) {
                return this.parseComprehension(node, false);
              }
              node.elements = this.parseExprList(tt.bracketR, true, true, refShorthandDefaultPos);
              return this.finishNode(node, "ArrayExpression");
            case tt.braceL:
              return this.parseObj(false, refShorthandDefaultPos);
            case tt._function:
              node = this.startNode();
              this.next();
              return this.parseFunction(node, false);
            case tt._class:
              return this.parseClass(this.startNode(), false);
            case tt._new:
              return this.parseNew();
            case tt.backQuote:
              return this.parseTemplate();
            default:
              this.unexpected();
          }
        };
        pp.parseLiteral = function(value) {
          var node = this.startNode();
          node.value = value;
          node.raw = this.input.slice(this.start, this.end);
          this.next();
          return this.finishNode(node, "Literal");
        };
        pp.parseParenExpression = function() {
          this.expect(tt.parenL);
          var val = this.parseExpression();
          this.expect(tt.parenR);
          return val;
        };
        pp.parseParenAndDistinguishExpression = function(canBeArrow) {
          var startPos = this.start,
              startLoc = this.startLoc,
              val = undefined;
          if (this.options.ecmaVersion >= 6) {
            this.next();
            if (this.options.ecmaVersion >= 7 && this.type === tt._for) {
              return this.parseComprehension(this.startNodeAt(startPos, startLoc), true);
            }
            var innerStartPos = this.start,
                innerStartLoc = this.startLoc;
            var exprList = [],
                first = true;
            var refShorthandDefaultPos = {start: 0},
                spreadStart = undefined,
                innerParenStart = undefined;
            while (this.type !== tt.parenR) {
              first ? first = false : this.expect(tt.comma);
              if (this.type === tt.ellipsis) {
                spreadStart = this.start;
                exprList.push(this.parseParenItem(this.parseRest()));
                break;
              } else {
                if (this.type === tt.parenL && !innerParenStart) {
                  innerParenStart = this.start;
                }
                exprList.push(this.parseMaybeAssign(false, refShorthandDefaultPos, this.parseParenItem));
              }
            }
            var innerEndPos = this.start,
                innerEndLoc = this.startLoc;
            this.expect(tt.parenR);
            if (canBeArrow && !this.canInsertSemicolon() && this.eat(tt.arrow)) {
              if (innerParenStart)
                this.unexpected(innerParenStart);
              return this.parseParenArrowList(startPos, startLoc, exprList);
            }
            if (!exprList.length)
              this.unexpected(this.lastTokStart);
            if (spreadStart)
              this.unexpected(spreadStart);
            if (refShorthandDefaultPos.start)
              this.unexpected(refShorthandDefaultPos.start);
            if (exprList.length > 1) {
              val = this.startNodeAt(innerStartPos, innerStartLoc);
              val.expressions = exprList;
              this.finishNodeAt(val, "SequenceExpression", innerEndPos, innerEndLoc);
            } else {
              val = exprList[0];
            }
          } else {
            val = this.parseParenExpression();
          }
          if (this.options.preserveParens) {
            var par = this.startNodeAt(startPos, startLoc);
            par.expression = val;
            return this.finishNode(par, "ParenthesizedExpression");
          } else {
            return val;
          }
        };
        pp.parseParenItem = function(item) {
          return item;
        };
        pp.parseParenArrowList = function(startPos, startLoc, exprList) {
          return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList);
        };
        var empty = [];
        pp.parseNew = function() {
          var node = this.startNode();
          var meta = this.parseIdent(true);
          if (this.options.ecmaVersion >= 6 && this.eat(tt.dot)) {
            node.meta = meta;
            node.property = this.parseIdent(true);
            if (node.property.name !== "target")
              this.raise(node.property.start, "The only valid meta property for new is new.target");
            return this.finishNode(node, "MetaProperty");
          }
          var startPos = this.start,
              startLoc = this.startLoc;
          node.callee = this.parseSubscripts(this.parseExprAtom(), startPos, startLoc, true);
          if (this.eat(tt.parenL))
            node.arguments = this.parseExprList(tt.parenR, false);
          else
            node.arguments = empty;
          return this.finishNode(node, "NewExpression");
        };
        pp.parseTemplateElement = function() {
          var elem = this.startNode();
          elem.value = {
            raw: this.input.slice(this.start, this.end),
            cooked: this.value
          };
          this.next();
          elem.tail = this.type === tt.backQuote;
          return this.finishNode(elem, "TemplateElement");
        };
        pp.parseTemplate = function() {
          var node = this.startNode();
          this.next();
          node.expressions = [];
          var curElt = this.parseTemplateElement();
          node.quasis = [curElt];
          while (!curElt.tail) {
            this.expect(tt.dollarBraceL);
            node.expressions.push(this.parseExpression());
            this.expect(tt.braceR);
            node.quasis.push(curElt = this.parseTemplateElement());
          }
          this.next();
          return this.finishNode(node, "TemplateLiteral");
        };
        pp.parseObj = function(isPattern, refShorthandDefaultPos) {
          var node = this.startNode(),
              first = true,
              propHash = {};
          node.properties = [];
          this.next();
          while (!this.eat(tt.braceR)) {
            if (!first) {
              this.expect(tt.comma);
              if (this.afterTrailingComma(tt.braceR))
                break;
            } else
              first = false;
            var prop = this.startNode(),
                isGenerator = undefined,
                startPos = undefined,
                startLoc = undefined;
            if (this.options.ecmaVersion >= 6) {
              prop.method = false;
              prop.shorthand = false;
              if (isPattern || refShorthandDefaultPos) {
                startPos = this.start;
                startLoc = this.startLoc;
              }
              if (!isPattern)
                isGenerator = this.eat(tt.star);
            }
            this.parsePropertyName(prop);
            this.parsePropertyValue(prop, isPattern, isGenerator, startPos, startLoc, refShorthandDefaultPos);
            this.checkPropClash(prop, propHash);
            node.properties.push(this.finishNode(prop, "Property"));
          }
          return this.finishNode(node, isPattern ? "ObjectPattern" : "ObjectExpression");
        };
        pp.parsePropertyValue = function(prop, isPattern, isGenerator, startPos, startLoc, refShorthandDefaultPos) {
          if (this.eat(tt.colon)) {
            prop.value = isPattern ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(false, refShorthandDefaultPos);
            prop.kind = "init";
          } else if (this.options.ecmaVersion >= 6 && this.type === tt.parenL) {
            if (isPattern)
              this.unexpected();
            prop.kind = "init";
            prop.method = true;
            prop.value = this.parseMethod(isGenerator);
          } else if (this.options.ecmaVersion >= 5 && !prop.computed && prop.key.type === "Identifier" && (prop.key.name === "get" || prop.key.name === "set") && (this.type != tt.comma && this.type != tt.braceR)) {
            if (isGenerator || isPattern)
              this.unexpected();
            prop.kind = prop.key.name;
            this.parsePropertyName(prop);
            prop.value = this.parseMethod(false);
          } else if (this.options.ecmaVersion >= 6 && !prop.computed && prop.key.type === "Identifier") {
            prop.kind = "init";
            if (isPattern) {
              if (this.isKeyword(prop.key.name) || this.strict && (reservedWords.strictBind(prop.key.name) || reservedWords.strict(prop.key.name)) || !this.options.allowReserved && this.isReservedWord(prop.key.name))
                this.raise(prop.key.start, "Binding " + prop.key.name);
              prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key);
            } else if (this.type === tt.eq && refShorthandDefaultPos) {
              if (!refShorthandDefaultPos.start)
                refShorthandDefaultPos.start = this.start;
              prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key);
            } else {
              prop.value = prop.key;
            }
            prop.shorthand = true;
          } else
            this.unexpected();
        };
        pp.parsePropertyName = function(prop) {
          if (this.options.ecmaVersion >= 6) {
            if (this.eat(tt.bracketL)) {
              prop.computed = true;
              prop.key = this.parseMaybeAssign();
              this.expect(tt.bracketR);
              return prop.key;
            } else {
              prop.computed = false;
            }
          }
          return prop.key = this.type === tt.num || this.type === tt.string ? this.parseExprAtom() : this.parseIdent(true);
        };
        pp.initFunction = function(node) {
          node.id = null;
          if (this.options.ecmaVersion >= 6) {
            node.generator = false;
            node.expression = false;
          }
        };
        pp.parseMethod = function(isGenerator) {
          var node = this.startNode();
          this.initFunction(node);
          this.expect(tt.parenL);
          node.params = this.parseBindingList(tt.parenR, false, false);
          var allowExpressionBody = undefined;
          if (this.options.ecmaVersion >= 6) {
            node.generator = isGenerator;
            allowExpressionBody = true;
          } else {
            allowExpressionBody = false;
          }
          this.parseFunctionBody(node, allowExpressionBody);
          return this.finishNode(node, "FunctionExpression");
        };
        pp.parseArrowExpression = function(node, params) {
          this.initFunction(node);
          node.params = this.toAssignableList(params, true);
          this.parseFunctionBody(node, true);
          return this.finishNode(node, "ArrowFunctionExpression");
        };
        pp.parseFunctionBody = function(node, allowExpression) {
          var isExpression = allowExpression && this.type !== tt.braceL;
          if (isExpression) {
            node.body = this.parseMaybeAssign();
            node.expression = true;
          } else {
            var oldInFunc = this.inFunction,
                oldInGen = this.inGenerator,
                oldLabels = this.labels;
            this.inFunction = true;
            this.inGenerator = node.generator;
            this.labels = [];
            node.body = this.parseBlock(true);
            node.expression = false;
            this.inFunction = oldInFunc;
            this.inGenerator = oldInGen;
            this.labels = oldLabels;
          }
          if (this.strict || !isExpression && node.body.body.length && this.isUseStrict(node.body.body[0])) {
            var nameHash = {},
                oldStrict = this.strict;
            this.strict = true;
            if (node.id)
              this.checkLVal(node.id, true);
            for (var i = 0; i < node.params.length; i++) {
              this.checkLVal(node.params[i], true, nameHash);
            }
            this.strict = oldStrict;
          }
        };
        pp.parseExprList = function(close, allowTrailingComma, allowEmpty, refShorthandDefaultPos) {
          var elts = [],
              first = true;
          while (!this.eat(close)) {
            if (!first) {
              this.expect(tt.comma);
              if (allowTrailingComma && this.afterTrailingComma(close))
                break;
            } else
              first = false;
            if (allowEmpty && this.type === tt.comma) {
              elts.push(null);
            } else {
              if (this.type === tt.ellipsis)
                elts.push(this.parseSpread(refShorthandDefaultPos));
              else
                elts.push(this.parseMaybeAssign(false, refShorthandDefaultPos));
            }
          }
          return elts;
        };
        pp.parseIdent = function(liberal) {
          var node = this.startNode();
          if (liberal && this.options.allowReserved == "never")
            liberal = false;
          if (this.type === tt.name) {
            if (!liberal && (!this.options.allowReserved && this.isReservedWord(this.value) || this.strict && reservedWords.strict(this.value) && (this.options.ecmaVersion >= 6 || this.input.slice(this.start, this.end).indexOf("\\") == -1)))
              this.raise(this.start, "The keyword '" + this.value + "' is reserved");
            node.name = this.value;
          } else if (liberal && this.type.keyword) {
            node.name = this.type.keyword;
          } else {
            this.unexpected();
          }
          this.next();
          return this.finishNode(node, "Identifier");
        };
        pp.parseYield = function() {
          var node = this.startNode();
          this.next();
          if (this.type == tt.semi || this.canInsertSemicolon() || this.type != tt.star && !this.type.startsExpr) {
            node.delegate = false;
            node.argument = null;
          } else {
            node.delegate = this.eat(tt.star);
            node.argument = this.parseMaybeAssign();
          }
          return this.finishNode(node, "YieldExpression");
        };
        pp.parseComprehension = function(node, isGenerator) {
          node.blocks = [];
          while (this.type === tt._for) {
            var block = this.startNode();
            this.next();
            this.expect(tt.parenL);
            block.left = this.parseBindingAtom();
            this.checkLVal(block.left, true);
            this.expectContextual("of");
            block.right = this.parseExpression();
            this.expect(tt.parenR);
            node.blocks.push(this.finishNode(block, "ComprehensionBlock"));
          }
          node.filter = this.eat(tt._if) ? this.parseParenExpression() : null;
          node.body = this.parseExpression();
          this.expect(isGenerator ? tt.parenR : tt.bracketR);
          node.generator = isGenerator;
          return this.finishNode(node, "ComprehensionExpression");
        };
      }, {
        "./identifier": 7,
        "./state": 13,
        "./tokentype": 17,
        "./util": 18
      }],
      7: [function(_dereq_, module, exports) {
        "use strict";
        exports.isIdentifierStart = isIdentifierStart;
        exports.isIdentifierChar = isIdentifierChar;
        exports.__esModule = true;
        function makePredicate(words) {
          words = words.split(" ");
          var f = "",
              cats = [];
          out: for (var i = 0; i < words.length; ++i) {
            for (var j = 0; j < cats.length; ++j) {
              if (cats[j][0].length == words[i].length) {
                cats[j].push(words[i]);
                continue out;
              }
            }
            cats.push([words[i]]);
          }
          function compareTo(arr) {
            if (arr.length == 1) {
              return f += "return str === " + JSON.stringify(arr[0]) + ";";
            }
            f += "switch(str){";
            for (var i = 0; i < arr.length; ++i) {
              f += "case " + JSON.stringify(arr[i]) + ":";
            }
            f += "return true}return false;";
          }
          if (cats.length > 3) {
            cats.sort(function(a, b) {
              return b.length - a.length;
            });
            f += "switch(str.length){";
            for (var i = 0; i < cats.length; ++i) {
              var cat = cats[i];
              f += "case " + cat[0].length + ":";
              compareTo(cat);
            }
            f += "}";
            ;
          } else {
            compareTo(words);
          }
          return new Function("str", f);
        }
        var reservedWords = {
          3: makePredicate("abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile"),
          5: makePredicate("class enum extends super const export import"),
          6: makePredicate("enum await"),
          strict: makePredicate("implements interface let package private protected public static yield"),
          strictBind: makePredicate("eval arguments")
        };
        exports.reservedWords = reservedWords;
        var ecma5AndLessKeywords = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this";
        var keywords = {
          5: makePredicate(ecma5AndLessKeywords),
          6: makePredicate(ecma5AndLessKeywords + " let const class extends export import yield super")
        };
        exports.keywords = keywords;
        var nonASCIIidentifierStartChars = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠ-ࢲऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞭꞰꞱꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭟꭤꭥꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ";
        var nonASCIIidentifierChars = "‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛ࣤ-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఃా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ഁ-ഃാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ංඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ູົຼ່-ໍ໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠐-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏ᦰ-ᧀᧈᧉ᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭ᳲ-᳴᳸᳹᷀-᷵᷼-᷿‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꘠-꘩꙯ꙴ-꙽ꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧꢀꢁꢴ-꣄꣐-꣙꣠-꣱꤀-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︭︳︴﹍-﹏０-９＿";
        var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
        var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
        nonASCIIidentifierStartChars = nonASCIIidentifierChars = null;
        var astralIdentifierStartCodes = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 17, 26, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 99, 39, 9, 51, 157, 310, 10, 21, 11, 7, 153, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 98, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 26, 45, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 955, 52, 76, 44, 33, 24, 27, 35, 42, 34, 4, 0, 13, 47, 15, 3, 22, 0, 38, 17, 2, 24, 133, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 32, 4, 287, 47, 21, 1, 2, 0, 185, 46, 82, 47, 21, 0, 60, 42, 502, 63, 32, 0, 449, 56, 1288, 920, 104, 110, 2962, 1070, 13266, 568, 8, 30, 114, 29, 19, 47, 17, 3, 32, 20, 6, 18, 881, 68, 12, 0, 67, 12, 16481, 1, 3071, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 4149, 196, 1340, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42710, 42, 4148, 12, 221, 16355, 541];
        var astralIdentifierCodes = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 1306, 2, 54, 14, 32, 9, 16, 3, 46, 10, 54, 9, 7, 2, 37, 13, 2, 9, 52, 0, 13, 2, 49, 13, 16, 9, 83, 11, 168, 11, 6, 9, 8, 2, 57, 0, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 316, 19, 13, 9, 214, 6, 3, 8, 112, 16, 16, 9, 82, 12, 9, 9, 535, 9, 20855, 9, 135, 4, 60, 6, 26, 9, 1016, 45, 17, 3, 19723, 1, 5319, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 4305, 6, 792618, 239];
        function isInAstralSet(code, set) {
          var pos = 65536;
          for (var i = 0; i < set.length; i += 2) {
            pos += set[i];
            if (pos > code) {
              return false;
            }
            pos += set[i + 1];
            if (pos >= code) {
              return true;
            }
          }
        }
        function isIdentifierStart(code, astral) {
          if (code < 65) {
            return code === 36;
          }
          if (code < 91) {
            return true;
          }
          if (code < 97) {
            return code === 95;
          }
          if (code < 123) {
            return true;
          }
          if (code <= 65535) {
            return code >= 170 && nonASCIIidentifierStart.test(String.fromCharCode(code));
          }
          if (astral === false) {
            return false;
          }
          return isInAstralSet(code, astralIdentifierStartCodes);
        }
        function isIdentifierChar(code, astral) {
          if (code < 48) {
            return code === 36;
          }
          if (code < 58) {
            return true;
          }
          if (code < 65) {
            return false;
          }
          if (code < 91) {
            return true;
          }
          if (code < 97) {
            return code === 95;
          }
          if (code < 123) {
            return true;
          }
          if (code <= 65535) {
            return code >= 170 && nonASCIIidentifier.test(String.fromCharCode(code));
          }
          if (astral === false) {
            return false;
          }
          return isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes);
        }
      }, {}],
      8: [function(_dereq_, module, exports) {
        "use strict";
        var _classCallCheck = function(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        };
        exports.getLineInfo = getLineInfo;
        exports.__esModule = true;
        var Parser = _dereq_("./state").Parser;
        var lineBreakG = _dereq_("./whitespace").lineBreakG;
        var deprecate = _dereq_("util").deprecate;
        var Position = exports.Position = (function() {
          function Position(line, col) {
            _classCallCheck(this, Position);
            this.line = line;
            this.column = col;
          }
          Position.prototype.offset = function offset(n) {
            return new Position(this.line, this.column + n);
          };
          return Position;
        })();
        var SourceLocation = exports.SourceLocation = function SourceLocation(p, start, end) {
          _classCallCheck(this, SourceLocation);
          this.start = start;
          this.end = end;
          if (p.sourceFile !== null)
            this.source = p.sourceFile;
        };
        function getLineInfo(input, offset) {
          for (var line = 1,
              cur = 0; ; ) {
            lineBreakG.lastIndex = cur;
            var match = lineBreakG.exec(input);
            if (match && match.index < offset) {
              ++line;
              cur = match.index + match[0].length;
            } else {
              return new Position(line, offset - cur);
            }
          }
        }
        var pp = Parser.prototype;
        pp.raise = function(pos, message) {
          var loc = getLineInfo(this.input, pos);
          message += " (" + loc.line + ":" + loc.column + ")";
          var err = new SyntaxError(message);
          err.pos = pos;
          err.loc = loc;
          err.raisedAt = this.pos;
          throw err;
        };
        pp.curPosition = function() {
          return new Position(this.curLine, this.pos - this.lineStart);
        };
        pp.markPosition = function() {
          return this.options.locations ? [this.start, this.startLoc] : this.start;
        };
      }, {
        "./state": 13,
        "./whitespace": 19,
        "util": 5
      }],
      9: [function(_dereq_, module, exports) {
        "use strict";
        var tt = _dereq_("./tokentype").types;
        var Parser = _dereq_("./state").Parser;
        var reservedWords = _dereq_("./identifier").reservedWords;
        var has = _dereq_("./util").has;
        var pp = Parser.prototype;
        pp.toAssignable = function(node, isBinding) {
          if (this.options.ecmaVersion >= 6 && node) {
            switch (node.type) {
              case "Identifier":
              case "ObjectPattern":
              case "ArrayPattern":
              case "AssignmentPattern":
                break;
              case "ObjectExpression":
                node.type = "ObjectPattern";
                for (var i = 0; i < node.properties.length; i++) {
                  var prop = node.properties[i];
                  if (prop.kind !== "init")
                    this.raise(prop.key.start, "Object pattern can't contain getter or setter");
                  this.toAssignable(prop.value, isBinding);
                }
                break;
              case "ArrayExpression":
                node.type = "ArrayPattern";
                this.toAssignableList(node.elements, isBinding);
                break;
              case "AssignmentExpression":
                if (node.operator === "=") {
                  node.type = "AssignmentPattern";
                } else {
                  this.raise(node.left.end, "Only '=' operator can be used for specifying default value.");
                }
                break;
              case "ParenthesizedExpression":
                node.expression = this.toAssignable(node.expression, isBinding);
                break;
              case "MemberExpression":
                if (!isBinding)
                  break;
              default:
                this.raise(node.start, "Assigning to rvalue");
            }
          }
          return node;
        };
        pp.toAssignableList = function(exprList, isBinding) {
          var end = exprList.length;
          if (end) {
            var last = exprList[end - 1];
            if (last && last.type == "RestElement") {
              --end;
            } else if (last && last.type == "SpreadElement") {
              last.type = "RestElement";
              var arg = last.argument;
              this.toAssignable(arg, isBinding);
              if (arg.type !== "Identifier" && arg.type !== "MemberExpression" && arg.type !== "ArrayPattern")
                this.unexpected(arg.start);
              --end;
            }
          }
          for (var i = 0; i < end; i++) {
            var elt = exprList[i];
            if (elt)
              this.toAssignable(elt, isBinding);
          }
          return exprList;
        };
        pp.parseSpread = function(refShorthandDefaultPos) {
          var node = this.startNode();
          this.next();
          node.argument = this.parseMaybeAssign(refShorthandDefaultPos);
          return this.finishNode(node, "SpreadElement");
        };
        pp.parseRest = function() {
          var node = this.startNode();
          this.next();
          node.argument = this.type === tt.name || this.type === tt.bracketL ? this.parseBindingAtom() : this.unexpected();
          return this.finishNode(node, "RestElement");
        };
        pp.parseBindingAtom = function() {
          if (this.options.ecmaVersion < 6)
            return this.parseIdent();
          switch (this.type) {
            case tt.name:
              return this.parseIdent();
            case tt.bracketL:
              var node = this.startNode();
              this.next();
              node.elements = this.parseBindingList(tt.bracketR, true, true);
              return this.finishNode(node, "ArrayPattern");
            case tt.braceL:
              return this.parseObj(true);
            default:
              this.unexpected();
          }
        };
        pp.parseBindingList = function(close, allowEmpty, allowTrailingComma) {
          var elts = [],
              first = true;
          while (!this.eat(close)) {
            if (first)
              first = false;
            else
              this.expect(tt.comma);
            if (allowEmpty && this.type === tt.comma) {
              elts.push(null);
            } else if (allowTrailingComma && this.afterTrailingComma(close)) {
              break;
            } else if (this.type === tt.ellipsis) {
              var rest = this.parseRest();
              this.parseBindingListItem(rest);
              elts.push(rest);
              this.expect(close);
              break;
            } else {
              var elem = this.parseMaybeDefault(this.start, this.startLoc);
              this.parseBindingListItem(elem);
              elts.push(elem);
            }
          }
          return elts;
        };
        pp.parseBindingListItem = function(param) {
          return param;
        };
        pp.parseMaybeDefault = function(startPos, startLoc, left) {
          if (Array.isArray(startPos)) {
            if (this.options.locations && noCalls === undefined) {
              left = startLoc;
              startLoc = startPos[1];
              startPos = startPos[0];
            }
          }
          left = left || this.parseBindingAtom();
          if (!this.eat(tt.eq))
            return left;
          var node = this.startNodeAt(startPos, startLoc);
          node.operator = "=";
          node.left = left;
          node.right = this.parseMaybeAssign();
          return this.finishNode(node, "AssignmentPattern");
        };
        pp.checkLVal = function(expr, isBinding, checkClashes) {
          switch (expr.type) {
            case "Identifier":
              if (this.strict && (reservedWords.strictBind(expr.name) || reservedWords.strict(expr.name)))
                this.raise(expr.start, (isBinding ? "Binding " : "Assigning to ") + expr.name + " in strict mode");
              if (checkClashes) {
                if (has(checkClashes, expr.name))
                  this.raise(expr.start, "Argument name clash in strict mode");
                checkClashes[expr.name] = true;
              }
              break;
            case "MemberExpression":
              if (isBinding)
                this.raise(expr.start, (isBinding ? "Binding" : "Assigning to") + " member expression");
              break;
            case "ObjectPattern":
              for (var i = 0; i < expr.properties.length; i++) {
                this.checkLVal(expr.properties[i].value, isBinding, checkClashes);
              }
              break;
            case "ArrayPattern":
              for (var i = 0; i < expr.elements.length; i++) {
                var elem = expr.elements[i];
                if (elem)
                  this.checkLVal(elem, isBinding, checkClashes);
              }
              break;
            case "AssignmentPattern":
              this.checkLVal(expr.left, isBinding, checkClashes);
              break;
            case "RestElement":
              this.checkLVal(expr.argument, isBinding, checkClashes);
              break;
            case "ParenthesizedExpression":
              this.checkLVal(expr.expression, isBinding, checkClashes);
              break;
            default:
              this.raise(expr.start, (isBinding ? "Binding" : "Assigning to") + " rvalue");
          }
        };
      }, {
        "./identifier": 7,
        "./state": 13,
        "./tokentype": 17,
        "./util": 18
      }],
      10: [function(_dereq_, module, exports) {
        "use strict";
        var _classCallCheck = function(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        };
        exports.__esModule = true;
        var Parser = _dereq_("./state").Parser;
        var SourceLocation = _dereq_("./location").SourceLocation;
        var pp = Parser.prototype;
        var Node = exports.Node = function Node() {
          _classCallCheck(this, Node);
        };
        pp.startNode = function() {
          var node = new Node();
          node.start = this.start;
          if (this.options.locations)
            node.loc = new SourceLocation(this, this.startLoc);
          if (this.options.directSourceFile)
            node.sourceFile = this.options.directSourceFile;
          if (this.options.ranges)
            node.range = [this.start, 0];
          return node;
        };
        pp.startNodeAt = function(pos, loc) {
          var node = new Node();
          if (Array.isArray(pos)) {
            if (this.options.locations && loc === undefined) {
              loc = pos[1];
              pos = pos[0];
            }
          }
          node.start = pos;
          if (this.options.locations)
            node.loc = new SourceLocation(this, loc);
          if (this.options.directSourceFile)
            node.sourceFile = this.options.directSourceFile;
          if (this.options.ranges)
            node.range = [pos, 0];
          return node;
        };
        pp.finishNode = function(node, type) {
          node.type = type;
          node.end = this.lastTokEnd;
          if (this.options.locations)
            node.loc.end = this.lastTokEndLoc;
          if (this.options.ranges)
            node.range[1] = this.lastTokEnd;
          return node;
        };
        pp.finishNodeAt = function(node, type, pos, loc) {
          node.type = type;
          if (Array.isArray(pos)) {
            if (this.options.locations && loc === undefined) {
              loc = pos[1];
              pos = pos[0];
            }
          }
          node.end = pos;
          if (this.options.locations)
            node.loc.end = loc;
          if (this.options.ranges)
            node.range[1] = pos;
          return node;
        };
      }, {
        "./location": 8,
        "./state": 13
      }],
      11: [function(_dereq_, module, exports) {
        "use strict";
        exports.getOptions = getOptions;
        exports.__esModule = true;
        var _util = _dereq_("./util");
        var has = _util.has;
        var isArray = _util.isArray;
        var SourceLocation = _dereq_("./location").SourceLocation;
        var defaultOptions = {
          ecmaVersion: 5,
          sourceType: "script",
          onInsertedSemicolon: null,
          onTrailingComma: null,
          allowReserved: true,
          allowReturnOutsideFunction: false,
          allowImportExportEverywhere: false,
          allowHashBang: false,
          locations: false,
          onToken: null,
          onComment: null,
          ranges: false,
          program: null,
          sourceFile: null,
          directSourceFile: null,
          preserveParens: false,
          plugins: {}
        };
        exports.defaultOptions = defaultOptions;
        function getOptions(opts) {
          var options = {};
          for (var opt in defaultOptions) {
            options[opt] = opts && has(opts, opt) ? opts[opt] : defaultOptions[opt];
          }
          if (isArray(options.onToken)) {
            (function() {
              var tokens = options.onToken;
              options.onToken = function(token) {
                return tokens.push(token);
              };
            })();
          }
          if (isArray(options.onComment))
            options.onComment = pushComment(options, options.onComment);
          return options;
        }
        function pushComment(options, array) {
          return function(block, text, start, end, startLoc, endLoc) {
            var comment = {
              type: block ? "Block" : "Line",
              value: text,
              start: start,
              end: end
            };
            if (options.locations)
              comment.loc = new SourceLocation(this, startLoc, endLoc);
            if (options.ranges)
              comment.range = [start, end];
            array.push(comment);
          };
        }
      }, {
        "./location": 8,
        "./util": 18
      }],
      12: [function(_dereq_, module, exports) {
        "use strict";
        var tt = _dereq_("./tokentype").types;
        var Parser = _dereq_("./state").Parser;
        var lineBreak = _dereq_("./whitespace").lineBreak;
        var pp = Parser.prototype;
        pp.isUseStrict = function(stmt) {
          return this.options.ecmaVersion >= 5 && stmt.type === "ExpressionStatement" && stmt.expression.type === "Literal" && stmt.expression.value === "use strict";
        };
        pp.eat = function(type) {
          if (this.type === type) {
            this.next();
            return true;
          } else {
            return false;
          }
        };
        pp.isContextual = function(name) {
          return this.type === tt.name && this.value === name;
        };
        pp.eatContextual = function(name) {
          return this.value === name && this.eat(tt.name);
        };
        pp.expectContextual = function(name) {
          if (!this.eatContextual(name))
            this.unexpected();
        };
        pp.canInsertSemicolon = function() {
          return this.type === tt.eof || this.type === tt.braceR || lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
        };
        pp.insertSemicolon = function() {
          if (this.canInsertSemicolon()) {
            if (this.options.onInsertedSemicolon)
              this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc);
            return true;
          }
        };
        pp.semicolon = function() {
          if (!this.eat(tt.semi) && !this.insertSemicolon())
            this.unexpected();
        };
        pp.afterTrailingComma = function(tokType) {
          if (this.type == tokType) {
            if (this.options.onTrailingComma)
              this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc);
            this.next();
            return true;
          }
        };
        pp.expect = function(type) {
          this.eat(type) || this.unexpected();
        };
        pp.unexpected = function(pos) {
          this.raise(pos != null ? pos : this.start, "Unexpected token");
        };
      }, {
        "./state": 13,
        "./tokentype": 17,
        "./whitespace": 19
      }],
      13: [function(_dereq_, module, exports) {
        "use strict";
        exports.Parser = Parser;
        exports.__esModule = true;
        var _identifier = _dereq_("./identifier");
        var reservedWords = _identifier.reservedWords;
        var keywords = _identifier.keywords;
        var tt = _dereq_("./tokentype").types;
        var lineBreak = _dereq_("./whitespace").lineBreak;
        function Parser(options, input, startPos) {
          this.options = options;
          this.sourceFile = this.options.sourceFile || null;
          this.isKeyword = keywords[this.options.ecmaVersion >= 6 ? 6 : 5];
          this.isReservedWord = reservedWords[this.options.ecmaVersion];
          this.input = input;
          this.loadPlugins(this.options.plugins);
          if (startPos) {
            this.pos = startPos;
            this.lineStart = Math.max(0, this.input.lastIndexOf("\n", startPos));
            this.curLine = this.input.slice(0, this.lineStart).split(lineBreak).length;
          } else {
            this.pos = this.lineStart = 0;
            this.curLine = 1;
          }
          this.type = tt.eof;
          this.value = null;
          this.start = this.end = this.pos;
          this.startLoc = this.endLoc = null;
          this.lastTokEndLoc = this.lastTokStartLoc = null;
          this.lastTokStart = this.lastTokEnd = this.pos;
          this.context = this.initialContext();
          this.exprAllowed = true;
          this.strict = this.inModule = this.options.sourceType === "module";
          this.potentialArrowAt = -1;
          this.inFunction = this.inGenerator = false;
          this.labels = [];
          if (this.pos === 0 && this.options.allowHashBang && this.input.slice(0, 2) === "#!")
            this.skipLineComment(2);
        }
        Parser.prototype.extend = function(name, f) {
          this[name] = f(this[name]);
        };
        var plugins = {};
        exports.plugins = plugins;
        Parser.prototype.loadPlugins = function(plugins) {
          for (var _name in plugins) {
            var plugin = exports.plugins[_name];
            if (!plugin)
              throw new Error("Plugin '" + _name + "' not found");
            plugin(this, plugins[_name]);
          }
        };
      }, {
        "./identifier": 7,
        "./tokentype": 17,
        "./whitespace": 19
      }],
      14: [function(_dereq_, module, exports) {
        "use strict";
        var tt = _dereq_("./tokentype").types;
        var Parser = _dereq_("./state").Parser;
        var lineBreak = _dereq_("./whitespace").lineBreak;
        var pp = Parser.prototype;
        pp.parseTopLevel = function(node) {
          var first = true;
          if (!node.body)
            node.body = [];
          while (this.type !== tt.eof) {
            var stmt = this.parseStatement(true, true);
            node.body.push(stmt);
            if (first && this.isUseStrict(stmt))
              this.setStrict(true);
            first = false;
          }
          this.next();
          if (this.options.ecmaVersion >= 6) {
            node.sourceType = this.options.sourceType;
          }
          return this.finishNode(node, "Program");
        };
        var loopLabel = {kind: "loop"},
            switchLabel = {kind: "switch"};
        pp.parseStatement = function(declaration, topLevel) {
          var starttype = this.type,
              node = this.startNode();
          switch (starttype) {
            case tt._break:
            case tt._continue:
              return this.parseBreakContinueStatement(node, starttype.keyword);
            case tt._debugger:
              return this.parseDebuggerStatement(node);
            case tt._do:
              return this.parseDoStatement(node);
            case tt._for:
              return this.parseForStatement(node);
            case tt._function:
              if (!declaration && this.options.ecmaVersion >= 6)
                this.unexpected();
              return this.parseFunctionStatement(node);
            case tt._class:
              if (!declaration)
                this.unexpected();
              return this.parseClass(node, true);
            case tt._if:
              return this.parseIfStatement(node);
            case tt._return:
              return this.parseReturnStatement(node);
            case tt._switch:
              return this.parseSwitchStatement(node);
            case tt._throw:
              return this.parseThrowStatement(node);
            case tt._try:
              return this.parseTryStatement(node);
            case tt._let:
            case tt._const:
              if (!declaration)
                this.unexpected();
            case tt._var:
              return this.parseVarStatement(node, starttype);
            case tt._while:
              return this.parseWhileStatement(node);
            case tt._with:
              return this.parseWithStatement(node);
            case tt.braceL:
              return this.parseBlock();
            case tt.semi:
              return this.parseEmptyStatement(node);
            case tt._export:
            case tt._import:
              if (!this.options.allowImportExportEverywhere) {
                if (!topLevel)
                  this.raise(this.start, "'import' and 'export' may only appear at the top level");
                if (!this.inModule)
                  this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'");
              }
              return starttype === tt._import ? this.parseImport(node) : this.parseExport(node);
            default:
              var maybeName = this.value,
                  expr = this.parseExpression();
              if (starttype === tt.name && expr.type === "Identifier" && this.eat(tt.colon))
                return this.parseLabeledStatement(node, maybeName, expr);
              else
                return this.parseExpressionStatement(node, expr);
          }
        };
        pp.parseBreakContinueStatement = function(node, keyword) {
          var isBreak = keyword == "break";
          this.next();
          if (this.eat(tt.semi) || this.insertSemicolon())
            node.label = null;
          else if (this.type !== tt.name)
            this.unexpected();
          else {
            node.label = this.parseIdent();
            this.semicolon();
          }
          for (var i = 0; i < this.labels.length; ++i) {
            var lab = this.labels[i];
            if (node.label == null || lab.name === node.label.name) {
              if (lab.kind != null && (isBreak || lab.kind === "loop"))
                break;
              if (node.label && isBreak)
                break;
            }
          }
          if (i === this.labels.length)
            this.raise(node.start, "Unsyntactic " + keyword);
          return this.finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement");
        };
        pp.parseDebuggerStatement = function(node) {
          this.next();
          this.semicolon();
          return this.finishNode(node, "DebuggerStatement");
        };
        pp.parseDoStatement = function(node) {
          this.next();
          this.labels.push(loopLabel);
          node.body = this.parseStatement(false);
          this.labels.pop();
          this.expect(tt._while);
          node.test = this.parseParenExpression();
          if (this.options.ecmaVersion >= 6)
            this.eat(tt.semi);
          else
            this.semicolon();
          return this.finishNode(node, "DoWhileStatement");
        };
        pp.parseForStatement = function(node) {
          this.next();
          this.labels.push(loopLabel);
          this.expect(tt.parenL);
          if (this.type === tt.semi)
            return this.parseFor(node, null);
          if (this.type === tt._var || this.type === tt._let || this.type === tt._const) {
            var _init = this.startNode(),
                varKind = this.type;
            this.next();
            this.parseVar(_init, true, varKind);
            this.finishNode(_init, "VariableDeclaration");
            if ((this.type === tt._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) && _init.declarations.length === 1 && !(varKind !== tt._var && _init.declarations[0].init))
              return this.parseForIn(node, _init);
            return this.parseFor(node, _init);
          }
          var refShorthandDefaultPos = {start: 0};
          var init = this.parseExpression(true, refShorthandDefaultPos);
          if (this.type === tt._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) {
            this.toAssignable(init);
            this.checkLVal(init);
            return this.parseForIn(node, init);
          } else if (refShorthandDefaultPos.start) {
            this.unexpected(refShorthandDefaultPos.start);
          }
          return this.parseFor(node, init);
        };
        pp.parseFunctionStatement = function(node) {
          this.next();
          return this.parseFunction(node, true);
        };
        pp.parseIfStatement = function(node) {
          this.next();
          node.test = this.parseParenExpression();
          node.consequent = this.parseStatement(false);
          node.alternate = this.eat(tt._else) ? this.parseStatement(false) : null;
          return this.finishNode(node, "IfStatement");
        };
        pp.parseReturnStatement = function(node) {
          if (!this.inFunction && !this.options.allowReturnOutsideFunction)
            this.raise(this.start, "'return' outside of function");
          this.next();
          if (this.eat(tt.semi) || this.insertSemicolon())
            node.argument = null;
          else {
            node.argument = this.parseExpression();
            this.semicolon();
          }
          return this.finishNode(node, "ReturnStatement");
        };
        pp.parseSwitchStatement = function(node) {
          this.next();
          node.discriminant = this.parseParenExpression();
          node.cases = [];
          this.expect(tt.braceL);
          this.labels.push(switchLabel);
          for (var cur,
              sawDefault; this.type != tt.braceR; ) {
            if (this.type === tt._case || this.type === tt._default) {
              var isCase = this.type === tt._case;
              if (cur)
                this.finishNode(cur, "SwitchCase");
              node.cases.push(cur = this.startNode());
              cur.consequent = [];
              this.next();
              if (isCase) {
                cur.test = this.parseExpression();
              } else {
                if (sawDefault)
                  this.raise(this.lastTokStart, "Multiple default clauses");
                sawDefault = true;
                cur.test = null;
              }
              this.expect(tt.colon);
            } else {
              if (!cur)
                this.unexpected();
              cur.consequent.push(this.parseStatement(true));
            }
          }
          if (cur)
            this.finishNode(cur, "SwitchCase");
          this.next();
          this.labels.pop();
          return this.finishNode(node, "SwitchStatement");
        };
        pp.parseThrowStatement = function(node) {
          this.next();
          if (lineBreak.test(this.input.slice(this.lastTokEnd, this.start)))
            this.raise(this.lastTokEnd, "Illegal newline after throw");
          node.argument = this.parseExpression();
          this.semicolon();
          return this.finishNode(node, "ThrowStatement");
        };
        var empty = [];
        pp.parseTryStatement = function(node) {
          this.next();
          node.block = this.parseBlock();
          node.handler = null;
          if (this.type === tt._catch) {
            var clause = this.startNode();
            this.next();
            this.expect(tt.parenL);
            clause.param = this.parseBindingAtom();
            this.checkLVal(clause.param, true);
            this.expect(tt.parenR);
            clause.guard = null;
            clause.body = this.parseBlock();
            node.handler = this.finishNode(clause, "CatchClause");
          }
          node.guardedHandlers = empty;
          node.finalizer = this.eat(tt._finally) ? this.parseBlock() : null;
          if (!node.handler && !node.finalizer)
            this.raise(node.start, "Missing catch or finally clause");
          return this.finishNode(node, "TryStatement");
        };
        pp.parseVarStatement = function(node, kind) {
          this.next();
          this.parseVar(node, false, kind);
          this.semicolon();
          return this.finishNode(node, "VariableDeclaration");
        };
        pp.parseWhileStatement = function(node) {
          this.next();
          node.test = this.parseParenExpression();
          this.labels.push(loopLabel);
          node.body = this.parseStatement(false);
          this.labels.pop();
          return this.finishNode(node, "WhileStatement");
        };
        pp.parseWithStatement = function(node) {
          if (this.strict)
            this.raise(this.start, "'with' in strict mode");
          this.next();
          node.object = this.parseParenExpression();
          node.body = this.parseStatement(false);
          return this.finishNode(node, "WithStatement");
        };
        pp.parseEmptyStatement = function(node) {
          this.next();
          return this.finishNode(node, "EmptyStatement");
        };
        pp.parseLabeledStatement = function(node, maybeName, expr) {
          for (var i = 0; i < this.labels.length; ++i) {
            if (this.labels[i].name === maybeName)
              this.raise(expr.start, "Label '" + maybeName + "' is already declared");
          }
          var kind = this.type.isLoop ? "loop" : this.type === tt._switch ? "switch" : null;
          this.labels.push({
            name: maybeName,
            kind: kind
          });
          node.body = this.parseStatement(true);
          this.labels.pop();
          node.label = expr;
          return this.finishNode(node, "LabeledStatement");
        };
        pp.parseExpressionStatement = function(node, expr) {
          node.expression = expr;
          this.semicolon();
          return this.finishNode(node, "ExpressionStatement");
        };
        pp.parseBlock = function(allowStrict) {
          var node = this.startNode(),
              first = true,
              oldStrict = undefined;
          node.body = [];
          this.expect(tt.braceL);
          while (!this.eat(tt.braceR)) {
            var stmt = this.parseStatement(true);
            node.body.push(stmt);
            if (first && allowStrict && this.isUseStrict(stmt)) {
              oldStrict = this.strict;
              this.setStrict(this.strict = true);
            }
            first = false;
          }
          if (oldStrict === false)
            this.setStrict(false);
          return this.finishNode(node, "BlockStatement");
        };
        pp.parseFor = function(node, init) {
          node.init = init;
          this.expect(tt.semi);
          node.test = this.type === tt.semi ? null : this.parseExpression();
          this.expect(tt.semi);
          node.update = this.type === tt.parenR ? null : this.parseExpression();
          this.expect(tt.parenR);
          node.body = this.parseStatement(false);
          this.labels.pop();
          return this.finishNode(node, "ForStatement");
        };
        pp.parseForIn = function(node, init) {
          var type = this.type === tt._in ? "ForInStatement" : "ForOfStatement";
          this.next();
          node.left = init;
          node.right = this.parseExpression();
          this.expect(tt.parenR);
          node.body = this.parseStatement(false);
          this.labels.pop();
          return this.finishNode(node, type);
        };
        pp.parseVar = function(node, isFor, kind) {
          node.declarations = [];
          node.kind = kind.keyword;
          for (; ; ) {
            var decl = this.startNode();
            this.parseVarId(decl);
            if (this.eat(tt.eq)) {
              decl.init = this.parseMaybeAssign(isFor);
            } else if (kind === tt._const && !(this.type === tt._in || this.options.ecmaVersion >= 6 && this.isContextual("of"))) {
              this.unexpected();
            } else if (decl.id.type != "Identifier" && !(isFor && (this.type === tt._in || this.isContextual("of")))) {
              this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value");
            } else {
              decl.init = null;
            }
            node.declarations.push(this.finishNode(decl, "VariableDeclarator"));
            if (!this.eat(tt.comma))
              break;
          }
          return node;
        };
        pp.parseVarId = function(decl) {
          decl.id = this.parseBindingAtom();
          this.checkLVal(decl.id, true);
        };
        pp.parseFunction = function(node, isStatement, allowExpressionBody) {
          this.initFunction(node);
          if (this.options.ecmaVersion >= 6)
            node.generator = this.eat(tt.star);
          if (isStatement || this.type === tt.name)
            node.id = this.parseIdent();
          this.parseFunctionParams(node);
          this.parseFunctionBody(node, allowExpressionBody);
          return this.finishNode(node, isStatement ? "FunctionDeclaration" : "FunctionExpression");
        };
        pp.parseFunctionParams = function(node) {
          this.expect(tt.parenL);
          node.params = this.parseBindingList(tt.parenR, false, false);
        };
        pp.parseClass = function(node, isStatement) {
          this.next();
          this.parseClassId(node, isStatement);
          this.parseClassSuper(node);
          var classBody = this.startNode();
          var hadConstructor = false;
          classBody.body = [];
          this.expect(tt.braceL);
          while (!this.eat(tt.braceR)) {
            if (this.eat(tt.semi))
              continue;
            var method = this.startNode();
            var isGenerator = this.eat(tt.star);
            var isMaybeStatic = this.type === tt.name && this.value === "static";
            this.parsePropertyName(method);
            method["static"] = isMaybeStatic && this.type !== tt.parenL;
            if (method["static"]) {
              if (isGenerator)
                this.unexpected();
              isGenerator = this.eat(tt.star);
              this.parsePropertyName(method);
            }
            method.kind = "method";
            if (!method.computed) {
              var key = method.key;
              var isGetSet = false;
              if (!isGenerator && key.type === "Identifier" && this.type !== tt.parenL && (key.name === "get" || key.name === "set")) {
                isGetSet = true;
                method.kind = key.name;
                key = this.parsePropertyName(method);
              }
              if (!method["static"] && (key.type === "Identifier" && key.name === "constructor" || key.type === "Literal" && key.value === "constructor")) {
                if (hadConstructor)
                  this.raise(key.start, "Duplicate constructor in the same class");
                if (isGetSet)
                  this.raise(key.start, "Constructor can't have get/set modifier");
                if (isGenerator)
                  this.raise(key.start, "Constructor can't be a generator");
                method.kind = "constructor";
                hadConstructor = true;
              }
            }
            this.parseClassMethod(classBody, method, isGenerator);
          }
          node.body = this.finishNode(classBody, "ClassBody");
          return this.finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression");
        };
        pp.parseClassMethod = function(classBody, method, isGenerator) {
          method.value = this.parseMethod(isGenerator);
          classBody.body.push(this.finishNode(method, "MethodDefinition"));
        };
        pp.parseClassId = function(node, isStatement) {
          node.id = this.type === tt.name ? this.parseIdent() : isStatement ? this.unexpected() : null;
        };
        pp.parseClassSuper = function(node) {
          node.superClass = this.eat(tt._extends) ? this.parseExprSubscripts() : null;
        };
        pp.parseExport = function(node) {
          this.next();
          if (this.eat(tt.star)) {
            this.expectContextual("from");
            node.source = this.type === tt.string ? this.parseExprAtom() : this.unexpected();
            this.semicolon();
            return this.finishNode(node, "ExportAllDeclaration");
          }
          if (this.eat(tt._default)) {
            var expr = this.parseMaybeAssign();
            var needsSemi = true;
            if (expr.type == "FunctionExpression" || expr.type == "ClassExpression") {
              needsSemi = false;
              if (expr.id) {
                expr.type = expr.type == "FunctionExpression" ? "FunctionDeclaration" : "ClassDeclaration";
              }
            }
            node.declaration = expr;
            if (needsSemi)
              this.semicolon();
            return this.finishNode(node, "ExportDefaultDeclaration");
          }
          if (this.shouldParseExportStatement()) {
            node.declaration = this.parseStatement(true);
            node.specifiers = [];
            node.source = null;
          } else {
            node.declaration = null;
            node.specifiers = this.parseExportSpecifiers();
            if (this.eatContextual("from")) {
              node.source = this.type === tt.string ? this.parseExprAtom() : this.unexpected();
            } else {
              node.source = null;
            }
            this.semicolon();
          }
          return this.finishNode(node, "ExportNamedDeclaration");
        };
        pp.shouldParseExportStatement = function() {
          return this.type.keyword;
        };
        pp.parseExportSpecifiers = function() {
          var nodes = [],
              first = true;
          this.expect(tt.braceL);
          while (!this.eat(tt.braceR)) {
            if (!first) {
              this.expect(tt.comma);
              if (this.afterTrailingComma(tt.braceR))
                break;
            } else
              first = false;
            var node = this.startNode();
            node.local = this.parseIdent(this.type === tt._default);
            node.exported = this.eatContextual("as") ? this.parseIdent(true) : node.local;
            nodes.push(this.finishNode(node, "ExportSpecifier"));
          }
          return nodes;
        };
        pp.parseImport = function(node) {
          this.next();
          if (this.type === tt.string) {
            node.specifiers = empty;
            node.source = this.parseExprAtom();
            node.kind = "";
          } else {
            node.specifiers = this.parseImportSpecifiers();
            this.expectContextual("from");
            node.source = this.type === tt.string ? this.parseExprAtom() : this.unexpected();
          }
          this.semicolon();
          return this.finishNode(node, "ImportDeclaration");
        };
        pp.parseImportSpecifiers = function() {
          var nodes = [],
              first = true;
          if (this.type === tt.name) {
            var node = this.startNode();
            node.local = this.parseIdent();
            this.checkLVal(node.local, true);
            nodes.push(this.finishNode(node, "ImportDefaultSpecifier"));
            if (!this.eat(tt.comma))
              return nodes;
          }
          if (this.type === tt.star) {
            var node = this.startNode();
            this.next();
            this.expectContextual("as");
            node.local = this.parseIdent();
            this.checkLVal(node.local, true);
            nodes.push(this.finishNode(node, "ImportNamespaceSpecifier"));
            return nodes;
          }
          this.expect(tt.braceL);
          while (!this.eat(tt.braceR)) {
            if (!first) {
              this.expect(tt.comma);
              if (this.afterTrailingComma(tt.braceR))
                break;
            } else
              first = false;
            var node = this.startNode();
            node.imported = this.parseIdent(true);
            node.local = this.eatContextual("as") ? this.parseIdent() : node.imported;
            this.checkLVal(node.local, true);
            nodes.push(this.finishNode(node, "ImportSpecifier"));
          }
          return nodes;
        };
      }, {
        "./state": 13,
        "./tokentype": 17,
        "./whitespace": 19
      }],
      15: [function(_dereq_, module, exports) {
        "use strict";
        var _classCallCheck = function(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        };
        exports.__esModule = true;
        var Parser = _dereq_("./state").Parser;
        var tt = _dereq_("./tokentype").types;
        var lineBreak = _dereq_("./whitespace").lineBreak;
        var TokContext = exports.TokContext = function TokContext(token, isExpr, preserveSpace, override) {
          _classCallCheck(this, TokContext);
          this.token = token;
          this.isExpr = isExpr;
          this.preserveSpace = preserveSpace;
          this.override = override;
        };
        var types = {
          b_stat: new TokContext("{", false),
          b_expr: new TokContext("{", true),
          b_tmpl: new TokContext("${", true),
          p_stat: new TokContext("(", false),
          p_expr: new TokContext("(", true),
          q_tmpl: new TokContext("`", true, true, function(p) {
            return p.readTmplToken();
          }),
          f_expr: new TokContext("function", true)
        };
        exports.types = types;
        var pp = Parser.prototype;
        pp.initialContext = function() {
          return [types.b_stat];
        };
        pp.braceIsBlock = function(prevType) {
          var parent = undefined;
          if (prevType === tt.colon && (parent = this.curContext()).token == "{")
            return !parent.isExpr;
          if (prevType === tt._return)
            return lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
          if (prevType === tt._else || prevType === tt.semi || prevType === tt.eof)
            return true;
          if (prevType == tt.braceL)
            return this.curContext() === types.b_stat;
          return !this.exprAllowed;
        };
        pp.updateContext = function(prevType) {
          var update = undefined,
              type = this.type;
          if (type.keyword && prevType == tt.dot)
            this.exprAllowed = false;
          else if (update = type.updateContext)
            update.call(this, prevType);
          else
            this.exprAllowed = type.beforeExpr;
        };
        tt.parenR.updateContext = tt.braceR.updateContext = function() {
          if (this.context.length == 1) {
            this.exprAllowed = true;
            return;
          }
          var out = this.context.pop();
          if (out === types.b_stat && this.curContext() === types.f_expr) {
            this.context.pop();
            this.exprAllowed = false;
          } else if (out === types.b_tmpl) {
            this.exprAllowed = true;
          } else {
            this.exprAllowed = !out.isExpr;
          }
        };
        tt.braceL.updateContext = function(prevType) {
          this.context.push(this.braceIsBlock(prevType) ? types.b_stat : types.b_expr);
          this.exprAllowed = true;
        };
        tt.dollarBraceL.updateContext = function() {
          this.context.push(types.b_tmpl);
          this.exprAllowed = true;
        };
        tt.parenL.updateContext = function(prevType) {
          var statementParens = prevType === tt._if || prevType === tt._for || prevType === tt._with || prevType === tt._while;
          this.context.push(statementParens ? types.p_stat : types.p_expr);
          this.exprAllowed = true;
        };
        tt.incDec.updateContext = function() {};
        tt._function.updateContext = function() {
          if (this.curContext() !== types.b_stat)
            this.context.push(types.f_expr);
          this.exprAllowed = false;
        };
        tt.backQuote.updateContext = function() {
          if (this.curContext() === types.q_tmpl)
            this.context.pop();
          else
            this.context.push(types.q_tmpl);
          this.exprAllowed = false;
        };
      }, {
        "./state": 13,
        "./tokentype": 17,
        "./whitespace": 19
      }],
      16: [function(_dereq_, module, exports) {
        "use strict";
        var _classCallCheck = function(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        };
        exports.__esModule = true;
        var _identifier = _dereq_("./identifier");
        var isIdentifierStart = _identifier.isIdentifierStart;
        var isIdentifierChar = _identifier.isIdentifierChar;
        var _tokentype = _dereq_("./tokentype");
        var tt = _tokentype.types;
        var keywordTypes = _tokentype.keywords;
        var Parser = _dereq_("./state").Parser;
        var SourceLocation = _dereq_("./location").SourceLocation;
        var _whitespace = _dereq_("./whitespace");
        var lineBreak = _whitespace.lineBreak;
        var lineBreakG = _whitespace.lineBreakG;
        var isNewLine = _whitespace.isNewLine;
        var nonASCIIwhitespace = _whitespace.nonASCIIwhitespace;
        var Token = exports.Token = function Token(p) {
          _classCallCheck(this, Token);
          this.type = p.type;
          this.value = p.value;
          this.start = p.start;
          this.end = p.end;
          if (p.options.locations)
            this.loc = new SourceLocation(p, p.startLoc, p.endLoc);
          if (p.options.ranges)
            this.range = [p.start, p.end];
        };
        var pp = Parser.prototype;
        var isRhino = typeof Packages !== "undefined";
        pp.next = function() {
          if (this.options.onToken)
            this.options.onToken(new Token(this));
          this.lastTokEnd = this.end;
          this.lastTokStart = this.start;
          this.lastTokEndLoc = this.endLoc;
          this.lastTokStartLoc = this.startLoc;
          this.nextToken();
        };
        pp.getToken = function() {
          this.next();
          return new Token(this);
        };
        if (typeof Symbol !== "undefined")
          pp[Symbol.iterator] = function() {
            var self = this;
            return {next: function next() {
                var token = self.getToken();
                return {
                  done: token.type === tt.eof,
                  value: token
                };
              }};
          };
        pp.setStrict = function(strict) {
          this.strict = strict;
          if (this.type !== tt.num && this.type !== tt.string)
            return;
          this.pos = this.start;
          if (this.options.locations) {
            while (this.pos < this.lineStart) {
              this.lineStart = this.input.lastIndexOf("\n", this.lineStart - 2) + 1;
              --this.curLine;
            }
          }
          this.nextToken();
        };
        pp.curContext = function() {
          return this.context[this.context.length - 1];
        };
        pp.nextToken = function() {
          var curContext = this.curContext();
          if (!curContext || !curContext.preserveSpace)
            this.skipSpace();
          this.start = this.pos;
          if (this.options.locations)
            this.startLoc = this.curPosition();
          if (this.pos >= this.input.length)
            return this.finishToken(tt.eof);
          if (curContext.override)
            return curContext.override(this);
          else
            this.readToken(this.fullCharCodeAtPos());
        };
        pp.readToken = function(code) {
          if (isIdentifierStart(code, this.options.ecmaVersion >= 6) || code === 92)
            return this.readWord();
          return this.getTokenFromCode(code);
        };
        pp.fullCharCodeAtPos = function() {
          var code = this.input.charCodeAt(this.pos);
          if (code <= 55295 || code >= 57344)
            return code;
          var next = this.input.charCodeAt(this.pos + 1);
          return (code << 10) + next - 56613888;
        };
        pp.skipBlockComment = function() {
          var startLoc = this.options.onComment && this.options.locations && this.curPosition();
          var start = this.pos,
              end = this.input.indexOf("*/", this.pos += 2);
          if (end === -1)
            this.raise(this.pos - 2, "Unterminated comment");
          this.pos = end + 2;
          if (this.options.locations) {
            lineBreakG.lastIndex = start;
            var match = undefined;
            while ((match = lineBreakG.exec(this.input)) && match.index < this.pos) {
              ++this.curLine;
              this.lineStart = match.index + match[0].length;
            }
          }
          if (this.options.onComment)
            this.options.onComment(true, this.input.slice(start + 2, end), start, this.pos, startLoc, this.options.locations && this.curPosition());
        };
        pp.skipLineComment = function(startSkip) {
          var start = this.pos;
          var startLoc = this.options.onComment && this.options.locations && this.curPosition();
          var ch = this.input.charCodeAt(this.pos += startSkip);
          while (this.pos < this.input.length && ch !== 10 && ch !== 13 && ch !== 8232 && ch !== 8233) {
            ++this.pos;
            ch = this.input.charCodeAt(this.pos);
          }
          if (this.options.onComment)
            this.options.onComment(false, this.input.slice(start + startSkip, this.pos), start, this.pos, startLoc, this.options.locations && this.curPosition());
        };
        pp.skipSpace = function() {
          while (this.pos < this.input.length) {
            var ch = this.input.charCodeAt(this.pos);
            if (ch === 32) {
              ++this.pos;
            } else if (ch === 13) {
              ++this.pos;
              var next = this.input.charCodeAt(this.pos);
              if (next === 10) {
                ++this.pos;
              }
              if (this.options.locations) {
                ++this.curLine;
                this.lineStart = this.pos;
              }
            } else if (ch === 10 || ch === 8232 || ch === 8233) {
              ++this.pos;
              if (this.options.locations) {
                ++this.curLine;
                this.lineStart = this.pos;
              }
            } else if (ch > 8 && ch < 14) {
              ++this.pos;
            } else if (ch === 47) {
              var next = this.input.charCodeAt(this.pos + 1);
              if (next === 42) {
                this.skipBlockComment();
              } else if (next === 47) {
                this.skipLineComment(2);
              } else
                break;
            } else if (ch === 160) {
              ++this.pos;
            } else if (ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch))) {
              ++this.pos;
            } else {
              break;
            }
          }
        };
        pp.finishToken = function(type, val) {
          this.end = this.pos;
          if (this.options.locations)
            this.endLoc = this.curPosition();
          var prevType = this.type;
          this.type = type;
          this.value = val;
          this.updateContext(prevType);
        };
        pp.readToken_dot = function() {
          var next = this.input.charCodeAt(this.pos + 1);
          if (next >= 48 && next <= 57)
            return this.readNumber(true);
          var next2 = this.input.charCodeAt(this.pos + 2);
          if (this.options.ecmaVersion >= 6 && next === 46 && next2 === 46) {
            this.pos += 3;
            return this.finishToken(tt.ellipsis);
          } else {
            ++this.pos;
            return this.finishToken(tt.dot);
          }
        };
        pp.readToken_slash = function() {
          var next = this.input.charCodeAt(this.pos + 1);
          if (this.exprAllowed) {
            ++this.pos;
            return this.readRegexp();
          }
          if (next === 61)
            return this.finishOp(tt.assign, 2);
          return this.finishOp(tt.slash, 1);
        };
        pp.readToken_mult_modulo = function(code) {
          var next = this.input.charCodeAt(this.pos + 1);
          if (next === 61)
            return this.finishOp(tt.assign, 2);
          return this.finishOp(code === 42 ? tt.star : tt.modulo, 1);
        };
        pp.readToken_pipe_amp = function(code) {
          var next = this.input.charCodeAt(this.pos + 1);
          if (next === code)
            return this.finishOp(code === 124 ? tt.logicalOR : tt.logicalAND, 2);
          if (next === 61)
            return this.finishOp(tt.assign, 2);
          return this.finishOp(code === 124 ? tt.bitwiseOR : tt.bitwiseAND, 1);
        };
        pp.readToken_caret = function() {
          var next = this.input.charCodeAt(this.pos + 1);
          if (next === 61)
            return this.finishOp(tt.assign, 2);
          return this.finishOp(tt.bitwiseXOR, 1);
        };
        pp.readToken_plus_min = function(code) {
          var next = this.input.charCodeAt(this.pos + 1);
          if (next === code) {
            if (next == 45 && this.input.charCodeAt(this.pos + 2) == 62 && lineBreak.test(this.input.slice(this.lastTokEnd, this.pos))) {
              this.skipLineComment(3);
              this.skipSpace();
              return this.nextToken();
            }
            return this.finishOp(tt.incDec, 2);
          }
          if (next === 61)
            return this.finishOp(tt.assign, 2);
          return this.finishOp(tt.plusMin, 1);
        };
        pp.readToken_lt_gt = function(code) {
          var next = this.input.charCodeAt(this.pos + 1);
          var size = 1;
          if (next === code) {
            size = code === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2;
            if (this.input.charCodeAt(this.pos + size) === 61)
              return this.finishOp(tt.assign, size + 1);
            return this.finishOp(tt.bitShift, size);
          }
          if (next == 33 && code == 60 && this.input.charCodeAt(this.pos + 2) == 45 && this.input.charCodeAt(this.pos + 3) == 45) {
            if (this.inModule)
              this.unexpected();
            this.skipLineComment(4);
            this.skipSpace();
            return this.nextToken();
          }
          if (next === 61)
            size = this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2;
          return this.finishOp(tt.relational, size);
        };
        pp.readToken_eq_excl = function(code) {
          var next = this.input.charCodeAt(this.pos + 1);
          if (next === 61)
            return this.finishOp(tt.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2);
          if (code === 61 && next === 62 && this.options.ecmaVersion >= 6) {
            this.pos += 2;
            return this.finishToken(tt.arrow);
          }
          return this.finishOp(code === 61 ? tt.eq : tt.prefix, 1);
        };
        pp.getTokenFromCode = function(code) {
          switch (code) {
            case 46:
              return this.readToken_dot();
            case 40:
              ++this.pos;
              return this.finishToken(tt.parenL);
            case 41:
              ++this.pos;
              return this.finishToken(tt.parenR);
            case 59:
              ++this.pos;
              return this.finishToken(tt.semi);
            case 44:
              ++this.pos;
              return this.finishToken(tt.comma);
            case 91:
              ++this.pos;
              return this.finishToken(tt.bracketL);
            case 93:
              ++this.pos;
              return this.finishToken(tt.bracketR);
            case 123:
              ++this.pos;
              return this.finishToken(tt.braceL);
            case 125:
              ++this.pos;
              return this.finishToken(tt.braceR);
            case 58:
              ++this.pos;
              return this.finishToken(tt.colon);
            case 63:
              ++this.pos;
              return this.finishToken(tt.question);
            case 96:
              if (this.options.ecmaVersion < 6)
                break;
              ++this.pos;
              return this.finishToken(tt.backQuote);
            case 48:
              var next = this.input.charCodeAt(this.pos + 1);
              if (next === 120 || next === 88)
                return this.readRadixNumber(16);
              if (this.options.ecmaVersion >= 6) {
                if (next === 111 || next === 79)
                  return this.readRadixNumber(8);
                if (next === 98 || next === 66)
                  return this.readRadixNumber(2);
              }
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
              return this.readNumber(false);
            case 34:
            case 39:
              return this.readString(code);
            case 47:
              return this.readToken_slash();
            case 37:
            case 42:
              return this.readToken_mult_modulo(code);
            case 124:
            case 38:
              return this.readToken_pipe_amp(code);
            case 94:
              return this.readToken_caret();
            case 43:
            case 45:
              return this.readToken_plus_min(code);
            case 60:
            case 62:
              return this.readToken_lt_gt(code);
            case 61:
            case 33:
              return this.readToken_eq_excl(code);
            case 126:
              return this.finishOp(tt.prefix, 1);
          }
          this.raise(this.pos, "Unexpected character '" + codePointToString(code) + "'");
        };
        pp.finishOp = function(type, size) {
          var str = this.input.slice(this.pos, this.pos + size);
          this.pos += size;
          return this.finishToken(type, str);
        };
        var regexpUnicodeSupport = false;
        try {
          new RegExp("￿", "u");
          regexpUnicodeSupport = true;
        } catch (e) {}
        pp.readRegexp = function() {
          var escaped = undefined,
              inClass = undefined,
              start = this.pos;
          for (; ; ) {
            if (this.pos >= this.input.length)
              this.raise(start, "Unterminated regular expression");
            var ch = this.input.charAt(this.pos);
            if (lineBreak.test(ch))
              this.raise(start, "Unterminated regular expression");
            if (!escaped) {
              if (ch === "[")
                inClass = true;
              else if (ch === "]" && inClass)
                inClass = false;
              else if (ch === "/" && !inClass)
                break;
              escaped = ch === "\\";
            } else
              escaped = false;
            ++this.pos;
          }
          var content = this.input.slice(start, this.pos);
          ++this.pos;
          var mods = this.readWord1();
          var tmp = content;
          if (mods) {
            var validFlags = /^[gmsiy]*$/;
            if (this.options.ecmaVersion >= 6)
              validFlags = /^[gmsiyu]*$/;
            if (!validFlags.test(mods))
              this.raise(start, "Invalid regular expression flag");
            if (mods.indexOf("u") >= 0 && !regexpUnicodeSupport) {
              tmp = tmp.replace(/\\u([a-fA-F0-9]{4})|\\u\{([0-9a-fA-F]+)\}|[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "x");
            }
          }
          var value = null;
          if (!isRhino) {
            try {
              new RegExp(tmp);
            } catch (e) {
              if (e instanceof SyntaxError)
                this.raise(start, "Error parsing regular expression: " + e.message);
              this.raise(e);
            }
            try {
              value = new RegExp(content, mods);
            } catch (err) {}
          }
          return this.finishToken(tt.regexp, {
            pattern: content,
            flags: mods,
            value: value
          });
        };
        pp.readInt = function(radix, len) {
          var start = this.pos,
              total = 0;
          for (var i = 0,
              e = len == null ? Infinity : len; i < e; ++i) {
            var code = this.input.charCodeAt(this.pos),
                val = undefined;
            if (code >= 97)
              val = code - 97 + 10;
            else if (code >= 65)
              val = code - 65 + 10;
            else if (code >= 48 && code <= 57)
              val = code - 48;
            else
              val = Infinity;
            if (val >= radix)
              break;
            ++this.pos;
            total = total * radix + val;
          }
          if (this.pos === start || len != null && this.pos - start !== len)
            return null;
          return total;
        };
        pp.readRadixNumber = function(radix) {
          this.pos += 2;
          var val = this.readInt(radix);
          if (val == null)
            this.raise(this.start + 2, "Expected number in radix " + radix);
          if (isIdentifierStart(this.fullCharCodeAtPos()))
            this.raise(this.pos, "Identifier directly after number");
          return this.finishToken(tt.num, val);
        };
        pp.readNumber = function(startsWithDot) {
          var start = this.pos,
              isFloat = false,
              octal = this.input.charCodeAt(this.pos) === 48;
          if (!startsWithDot && this.readInt(10) === null)
            this.raise(start, "Invalid number");
          if (this.input.charCodeAt(this.pos) === 46) {
            ++this.pos;
            this.readInt(10);
            isFloat = true;
          }
          var next = this.input.charCodeAt(this.pos);
          if (next === 69 || next === 101) {
            next = this.input.charCodeAt(++this.pos);
            if (next === 43 || next === 45)
              ++this.pos;
            if (this.readInt(10) === null)
              this.raise(start, "Invalid number");
            isFloat = true;
          }
          if (isIdentifierStart(this.fullCharCodeAtPos()))
            this.raise(this.pos, "Identifier directly after number");
          var str = this.input.slice(start, this.pos),
              val = undefined;
          if (isFloat)
            val = parseFloat(str);
          else if (!octal || str.length === 1)
            val = parseInt(str, 10);
          else if (/[89]/.test(str) || this.strict)
            this.raise(start, "Invalid number");
          else
            val = parseInt(str, 8);
          return this.finishToken(tt.num, val);
        };
        pp.readCodePoint = function() {
          var ch = this.input.charCodeAt(this.pos),
              code = undefined;
          if (ch === 123) {
            if (this.options.ecmaVersion < 6)
              this.unexpected();
            ++this.pos;
            code = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos);
            ++this.pos;
            if (code > 1114111)
              this.unexpected();
          } else {
            code = this.readHexChar(4);
          }
          return code;
        };
        function codePointToString(code) {
          if (code <= 65535) {
            return String.fromCharCode(code);
          }
          return String.fromCharCode((code - 65536 >> 10) + 55296, (code - 65536 & 1023) + 56320);
        }
        pp.readString = function(quote) {
          var out = "",
              chunkStart = ++this.pos;
          for (; ; ) {
            if (this.pos >= this.input.length)
              this.raise(this.start, "Unterminated string constant");
            var ch = this.input.charCodeAt(this.pos);
            if (ch === quote)
              break;
            if (ch === 92) {
              out += this.input.slice(chunkStart, this.pos);
              out += this.readEscapedChar();
              chunkStart = this.pos;
            } else {
              if (isNewLine(ch))
                this.raise(this.start, "Unterminated string constant");
              ++this.pos;
            }
          }
          out += this.input.slice(chunkStart, this.pos++);
          return this.finishToken(tt.string, out);
        };
        pp.readTmplToken = function() {
          var out = "",
              chunkStart = this.pos;
          for (; ; ) {
            if (this.pos >= this.input.length)
              this.raise(this.start, "Unterminated template");
            var ch = this.input.charCodeAt(this.pos);
            if (ch === 96 || ch === 36 && this.input.charCodeAt(this.pos + 1) === 123) {
              if (this.pos === this.start && this.type === tt.template) {
                if (ch === 36) {
                  this.pos += 2;
                  return this.finishToken(tt.dollarBraceL);
                } else {
                  ++this.pos;
                  return this.finishToken(tt.backQuote);
                }
              }
              out += this.input.slice(chunkStart, this.pos);
              return this.finishToken(tt.template, out);
            }
            if (ch === 92) {
              out += this.input.slice(chunkStart, this.pos);
              out += this.readEscapedChar();
              chunkStart = this.pos;
            } else if (isNewLine(ch)) {
              out += this.input.slice(chunkStart, this.pos);
              ++this.pos;
              if (ch === 13 && this.input.charCodeAt(this.pos) === 10) {
                ++this.pos;
                out += "\n";
              } else {
                out += String.fromCharCode(ch);
              }
              if (this.options.locations) {
                ++this.curLine;
                this.lineStart = this.pos;
              }
              chunkStart = this.pos;
            } else {
              ++this.pos;
            }
          }
        };
        pp.readEscapedChar = function() {
          var ch = this.input.charCodeAt(++this.pos);
          var octal = /^[0-7]+/.exec(this.input.slice(this.pos, this.pos + 3));
          if (octal)
            octal = octal[0];
          while (octal && parseInt(octal, 8) > 255)
            octal = octal.slice(0, -1);
          if (octal === "0")
            octal = null;
          ++this.pos;
          if (octal) {
            if (this.strict)
              this.raise(this.pos - 2, "Octal literal in strict mode");
            this.pos += octal.length - 1;
            return String.fromCharCode(parseInt(octal, 8));
          } else {
            switch (ch) {
              case 110:
                return "\n";
              case 114:
                return "\r";
              case 120:
                return String.fromCharCode(this.readHexChar(2));
              case 117:
                return codePointToString(this.readCodePoint());
              case 116:
                return "\t";
              case 98:
                return "\b";
              case 118:
                return "\u000b";
              case 102:
                return "\f";
              case 48:
                return "\u0000";
              case 13:
                if (this.input.charCodeAt(this.pos) === 10)
                  ++this.pos;
              case 10:
                if (this.options.locations) {
                  this.lineStart = this.pos;
                  ++this.curLine;
                }
                return "";
              default:
                return String.fromCharCode(ch);
            }
          }
        };
        pp.readHexChar = function(len) {
          var n = this.readInt(16, len);
          if (n === null)
            this.raise(this.start, "Bad character escape sequence");
          return n;
        };
        var containsEsc;
        pp.readWord1 = function() {
          containsEsc = false;
          var word = "",
              first = true,
              chunkStart = this.pos;
          var astral = this.options.ecmaVersion >= 6;
          while (this.pos < this.input.length) {
            var ch = this.fullCharCodeAtPos();
            if (isIdentifierChar(ch, astral)) {
              this.pos += ch <= 65535 ? 1 : 2;
            } else if (ch === 92) {
              containsEsc = true;
              word += this.input.slice(chunkStart, this.pos);
              var escStart = this.pos;
              if (this.input.charCodeAt(++this.pos) != 117)
                this.raise(this.pos, "Expecting Unicode escape sequence \\uXXXX");
              ++this.pos;
              var esc = this.readCodePoint();
              if (!(first ? isIdentifierStart : isIdentifierChar)(esc, astral))
                this.raise(escStart, "Invalid Unicode escape");
              word += codePointToString(esc);
              chunkStart = this.pos;
            } else {
              break;
            }
            first = false;
          }
          return word + this.input.slice(chunkStart, this.pos);
        };
        pp.readWord = function() {
          var word = this.readWord1();
          var type = tt.name;
          if ((this.options.ecmaVersion >= 6 || !containsEsc) && this.isKeyword(word))
            type = keywordTypes[word];
          return this.finishToken(type, word);
        };
      }, {
        "./identifier": 7,
        "./location": 8,
        "./state": 13,
        "./tokentype": 17,
        "./whitespace": 19
      }],
      17: [function(_dereq_, module, exports) {
        "use strict";
        var _classCallCheck = function(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        };
        exports.__esModule = true;
        var TokenType = exports.TokenType = function TokenType(label) {
          var conf = arguments[1] === undefined ? {} : arguments[1];
          _classCallCheck(this, TokenType);
          this.label = label;
          this.keyword = conf.keyword;
          this.beforeExpr = !!conf.beforeExpr;
          this.startsExpr = !!conf.startsExpr;
          this.isLoop = !!conf.isLoop;
          this.isAssign = !!conf.isAssign;
          this.prefix = !!conf.prefix;
          this.postfix = !!conf.postfix;
          this.binop = conf.binop || null;
          this.updateContext = null;
        };
        function binop(name, prec) {
          return new TokenType(name, {
            beforeExpr: true,
            binop: prec
          });
        }
        var beforeExpr = {beforeExpr: true},
            startsExpr = {startsExpr: true};
        var types = {
          num: new TokenType("num", startsExpr),
          regexp: new TokenType("regexp", startsExpr),
          string: new TokenType("string", startsExpr),
          name: new TokenType("name", startsExpr),
          eof: new TokenType("eof"),
          bracketL: new TokenType("[", {
            beforeExpr: true,
            startsExpr: true
          }),
          bracketR: new TokenType("]"),
          braceL: new TokenType("{", {
            beforeExpr: true,
            startsExpr: true
          }),
          braceR: new TokenType("}"),
          parenL: new TokenType("(", {
            beforeExpr: true,
            startsExpr: true
          }),
          parenR: new TokenType(")"),
          comma: new TokenType(",", beforeExpr),
          semi: new TokenType(";", beforeExpr),
          colon: new TokenType(":", beforeExpr),
          dot: new TokenType("."),
          question: new TokenType("?", beforeExpr),
          arrow: new TokenType("=>", beforeExpr),
          template: new TokenType("template"),
          ellipsis: new TokenType("...", beforeExpr),
          backQuote: new TokenType("`", startsExpr),
          dollarBraceL: new TokenType("${", {
            beforeExpr: true,
            startsExpr: true
          }),
          eq: new TokenType("=", {
            beforeExpr: true,
            isAssign: true
          }),
          assign: new TokenType("_=", {
            beforeExpr: true,
            isAssign: true
          }),
          incDec: new TokenType("++/--", {
            prefix: true,
            postfix: true,
            startsExpr: true
          }),
          prefix: new TokenType("prefix", {
            beforeExpr: true,
            prefix: true,
            startsExpr: true
          }),
          logicalOR: binop("||", 1),
          logicalAND: binop("&&", 2),
          bitwiseOR: binop("|", 3),
          bitwiseXOR: binop("^", 4),
          bitwiseAND: binop("&", 5),
          equality: binop("==/!=", 6),
          relational: binop("</>", 7),
          bitShift: binop("<</>>", 8),
          plusMin: new TokenType("+/-", {
            beforeExpr: true,
            binop: 9,
            prefix: true,
            startsExpr: true
          }),
          modulo: binop("%", 10),
          star: binop("*", 10),
          slash: binop("/", 10)
        };
        exports.types = types;
        var keywords = {};
        exports.keywords = keywords;
        function kw(name) {
          var options = arguments[1] === undefined ? {} : arguments[1];
          options.keyword = name;
          keywords[name] = types["_" + name] = new TokenType(name, options);
        }
        kw("break");
        kw("case", beforeExpr);
        kw("catch");
        kw("continue");
        kw("debugger");
        kw("default");
        kw("do", {isLoop: true});
        kw("else", beforeExpr);
        kw("finally");
        kw("for", {isLoop: true});
        kw("function", startsExpr);
        kw("if");
        kw("return", beforeExpr);
        kw("switch");
        kw("throw", beforeExpr);
        kw("try");
        kw("var");
        kw("let");
        kw("const");
        kw("while", {isLoop: true});
        kw("with");
        kw("new", {
          beforeExpr: true,
          startsExpr: true
        });
        kw("this", startsExpr);
        kw("super", startsExpr);
        kw("class");
        kw("extends", beforeExpr);
        kw("export");
        kw("import");
        kw("yield", {
          beforeExpr: true,
          startsExpr: true
        });
        kw("null", startsExpr);
        kw("true", startsExpr);
        kw("false", startsExpr);
        kw("in", {
          beforeExpr: true,
          binop: 7
        });
        kw("instanceof", {
          beforeExpr: true,
          binop: 7
        });
        kw("typeof", {
          beforeExpr: true,
          prefix: true,
          startsExpr: true
        });
        kw("void", {
          beforeExpr: true,
          prefix: true,
          startsExpr: true
        });
        kw("delete", {
          beforeExpr: true,
          prefix: true,
          startsExpr: true
        });
      }, {}],
      18: [function(_dereq_, module, exports) {
        "use strict";
        exports.isArray = isArray;
        exports.has = has;
        exports.__esModule = true;
        function isArray(obj) {
          return Object.prototype.toString.call(obj) === "[object Array]";
        }
        function has(obj, propName) {
          return Object.prototype.hasOwnProperty.call(obj, propName);
        }
      }, {}],
      19: [function(_dereq_, module, exports) {
        "use strict";
        exports.isNewLine = isNewLine;
        exports.__esModule = true;
        var lineBreak = /\r\n?|\n|\u2028|\u2029/;
        exports.lineBreak = lineBreak;
        var lineBreakG = new RegExp(lineBreak.source, "g");
        exports.lineBreakG = lineBreakG;
        function isNewLine(code) {
          return code === 10 || code === 13 || code === 8232 || code == 8233;
        }
        var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/;
        exports.nonASCIIwhitespace = nonASCIIwhitespace;
      }, {}]
    }, {}, [1])(1);
  });
})(require('process'));
