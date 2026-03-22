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
