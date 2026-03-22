module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1774155971787, function(require, module, exports) {
const registry = require("./registry");
const api = require("./api");
const runner = require("./runner");

module.exports = {
  ...registry,
  ...api,
  ...runner,
};

}, function(modId) {var map = {"./registry":1774155971788,"./api":1774155971789,"./runner":1774155971790}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1774155971788, function(require, module, exports) {
const registry = {};

function register(id, node) {
  registry[id] = node;
}

function get(id) {
  return registry[id];
}

function getAll() {
  return registry;
}

module.exports = {
  register,
  get,
  getAll,
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1774155971789, function(require, module, exports) {
const { get } = require("./registry");

async function tap(id) {
  const node = get(id);
  if (!node) throw new Error(`node not found: ${id}`);
  node.tap && node.tap();
}

async function input(id, value) {
  const node = get(id);
  if (!node) throw new Error(`node not found: ${id}`);
  node.input && node.input(value);
}


module.exports = {
  tap,
  input
};

}, function(modId) { var map = {"./registry":1774155971788}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1774155971790, function(require, module, exports) {
const { tap, input, safeTap } = require("./api");

async function run(steps = []) {
  for (const step of steps) {
    if (step.tap) {
      console.log("[TestBridge] tap:", step.tap);
      await tap(step.tap);
    }

    if (step.input) {
      console.log("[TestBridge] input:", step.input.id);
      await input(step.input.id, step.input.value);
    }
  }
  console.log("[TestBridge] 执行完成");
}

function runNoReturn(steps = []) {
  run(steps).catch(console.error);
}

module.exports = {
  run,
  runNoReturn,
};

}, function(modId) { var map = {"./api":1774155971789}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1774155971787);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map