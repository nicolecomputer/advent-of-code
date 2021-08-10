const fs = require("fs");

function twoNumbersThatSumToValue(target, values) {
  for (const i of values) {
    for (const j of values.slice(1)) {
      if (i + j == target) {
        return [i, j];
      }
    }
  }
  return null;
}

function threeNumbersThatSumToValue(target, values) {
  for (const i of values) {
    for (const j of values.slice(1)) {
      for (const k of values.slice(2)) {
        if (i + j + k == target) {
          return [i, j, k];
        }
      }
    }
  }

  return null;
}

function solution(input, summationFn, target) {
  const inputNumbers = input.split(" ").map((i) => {
    return parseInt(i);
  });

  const numberSet = summationFn(target, inputNumbers);
  const output = numberSet.reduce((t, i) => t * i, 1);

  return output;
}

const input = fs.readFileSync("./day-01-input.txt").toString();
console.log("part 1:", solution(input, twoNumbersThatSumToValue, 2020));
console.log("part 2:", solution(input, threeNumbersThatSumToValue, 2020));
