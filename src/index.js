const registry = require("./registry");
const api = require("./api");
const runner = require("./runner");

module.exports = {
  ...registry,
  ...api,
  ...runner,
};
