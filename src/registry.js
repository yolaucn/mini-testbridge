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
