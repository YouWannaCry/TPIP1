const { performance } = require('perf_hooks');
const EXEC = 1000;

function measure(func, runs = EXEC) {
  const times = [];
  for (let i = 0; i < runs; i++) {
    const start = performance.now();
    func();
    const end = performance.now();
    times.push(end - start);
  }
  const min = Math.min(...times);
  const avg = times.reduce((a, b) => a + b, 0) / runs;
  const max = Math.max(...times);
  return [min, avg, max];
}

// O(n)
const arr = Array.from({ length: 1_000_000 }, () =>
  Math.floor(Math.random() * 101)
);
function sumArray() {
  let total = 0;
  for (const value of arr) {
    total += value;
  }
}
const [minOn, avgOn, maxOn] = measure(sumArray);
console.log(
  `O(n)   - min: ${minOn.toFixed(6)} ms, avg: ${avgOn.toFixed(
    6
  )} ms, max: ${maxOn.toFixed(6)} ms`
);

// O(n^2)
function hasPairWithSum() {
  const array = Array.from({ length: EXEC }, () =>
    Math.floor(Math.random() * 500)
  );
  const a = Math.floor(Math.random() * 501);
  const b = EXEC - a;
  let pos1 = Math.floor(Math.random() * EXEC);
  let pos2 = pos1;
  while (pos2 === pos1) {
    pos2 = Math.floor(Math.random() * EXEC);
  }
  array[pos1] = a;
  array[pos2] = b;

  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] + array[j] === EXEC) return;
    }
  }
}
const [minOn2, avgOn2, maxOn2] = measure(hasPairWithSum);
console.log(
  `O(n^2) - min: ${minOn2.toFixed(3)} ms, avg: ${avgOn2.toFixed(
    3
  )} ms, max: ${maxOn2.toFixed(3)} ms`
);

// O(1)
const testSet = new Set(
  Array.from({ length: 1_000_000 }, () => Math.floor(Math.random() * 1_000_001))
);
const testValue = Math.floor(Math.random() * 1_000_001);
function isInSet() {
  testSet.has(testValue);
}
const [minO1, avgO1, maxO1] = measure(isInSet);
console.log(
  `O(1)   - min: ${(minO1 * 1e6).toFixed(0)} ns, avg: ${(avgO1 * 1e6).toFixed(
    0
  )} ns, max: ${(maxO1 * 1e6).toFixed(0)} ns`
);
