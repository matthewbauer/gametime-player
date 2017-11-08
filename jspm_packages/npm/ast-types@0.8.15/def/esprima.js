/* */ 
require('./es7');
var types = require('../lib/types');
var defaults = require('../lib/shared').defaults;
var def = types.Type.def;
var or = types.Type.or;
def("VariableDeclaration").field("declarations", [or(def("VariableDeclarator"), def("Identifier"))]);
def("Property").field("value", or(def("Expression"), def("Pattern")));
def("ArrayPattern").field("elements", [or(def("Pattern"), def("SpreadElement"), null)]);
def("ObjectPattern").field("properties", [or(def("Property"), def("PropertyPattern"), def("SpreadPropertyPattern"), def("SpreadProperty"))]);
def("ExportSpecifier").bases("ModuleSpecifier").build("id", "name");
def("ExportBatchSpecifier").bases("Specifier").build();
def("ImportSpecifier").bases("ModuleSpecifier").build("id", "name");
def("ImportNamespaceSpecifier").bases("ModuleSpecifier").build("id");
def("ImportDefaultSpecifier").bases("ModuleSpecifier").build("id");
def("ExportDeclaration").bases("Declaration").build("default", "declaration", "specifiers", "source").field("default", Boolean).field("declaration", or(def("Declaration"), def("Expression"), null)).field("specifiers", [or(def("ExportSpecifier"), def("ExportBatchSpecifier"))], defaults.emptyArray).field("source", or(def("Literal"), null), defaults["null"]);
def("ImportDeclaration").bases("Declaration").build("specifiers", "source").field("specifiers", [or(def("ImportSpecifier"), def("ImportNamespaceSpecifier"), def("ImportDefaultSpecifier"))], defaults.emptyArray).field("source", def("Literal"));
def("Block").bases("Comment").build("value", "leading", "trailing");
def("Line").bases("Comment").build("value", "leading", "trailing");
