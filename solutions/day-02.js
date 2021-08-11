const fs = require("fs");

function parseTobogganInputLine(input) {
  const [policyString, password] = input.split(":").map((s) => s.trim());
  const [repeatRangeString, targetChar] = policyString.split(" ");
  const [minimumOccurence, maximumOccurence] = repeatRangeString
    .split("-")
    .map((i) => parseInt(i));
  return {
    password,
    policy: {
      targetChar,
      minimumOccurence,
      maximumOccurence,
    },
  };
}

function parseAlternateTobogganInputLine(input) {
  const [policyString, password] = input.split(":").map((s) => s.trim());
  const [repeatRangeString, targetChar] = policyString.split(" ");
  const [index1, index2] = repeatRangeString.split("-").map((i) => parseInt(i));

  return {
    password,
    policy: {
      targetChar,
      index1,
      index2,
    },
  };
}

function isValidTobogganPassword(password, policy) {
  const occurenceCount = password
    .split("")
    .filter((c) => c == policy.targetChar).length;
  return (
    occurenceCount >= policy.minimumOccurence &&
    occurenceCount <= policy.maximumOccurence
  );
}

function isValidAlternateTobogganPassword(password, policy) {
  return (
    [
      password[policy.index1 - 1] == policy.targetChar,
      password[policy.index2 - 1] == policy.targetChar,
    ].filter((a) => a == true).length == 1
  );
}

function validPasswordCount(inputFile, parseFn, validationFn) {
  return fs
    .readFileSync("./day-02-input.txt")
    .toString()
    .trim()
    .split("\n")
    .map((line) => parseFn(line))
    .filter((input) => validationFn(input.password, input.policy)).length;
}

console.log(
  validPasswordCount(
    "./day-02-input.txt",
    parseTobogganInputLine,
    isValidTobogganPassword
  )
);

console.log(
  validPasswordCount(
    "./day-02-input.txt",
    parseAlternateTobogganInputLine,
    isValidAlternateTobogganPassword
  )
);
