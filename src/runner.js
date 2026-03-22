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
