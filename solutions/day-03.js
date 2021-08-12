const fs = require("fs");

function parseWorldMap(str) {
  return str.split("\n").map((row) => row.split(""));
}

function objAt(worldMap, position) {
  return worldMap[position.row][position.column % worldMap[0].length];
}

const startingPosition = { row: 0, column: 0 };

function nextPosition(position, slope) {
  return {
    row: position.row + slope.down,
    column: position.column + slope.right,
  };
}

function treesEncountered(inputStr, slope) {
  const worldMap = parseWorldMap(inputStr);
  var position = startingPosition;
  var encounteredObjects = [];

  while (position.row < worldMap.length) {
    encounteredObjects = [...encounteredObjects, objAt(worldMap, position)];
    position = nextPosition(position, slope);
  }

  const numberOfTrees = encounteredObjects.filter((o) => o == "#").length;

  return numberOfTrees;
}

function part2(inputStr) {
  return (
    treesEncountered(inputStr, { right: 1, down: 1 }) *
    treesEncountered(inputStr, { right: 3, down: 1 }) *
    treesEncountered(inputStr, { right: 5, down: 1 }) *
    treesEncountered(inputStr, { right: 7, down: 1 }) *
    treesEncountered(inputStr, { right: 1, down: 2 })
  );
}

// const inputStr = `
// ..##.......
// #...#...#..
// .#....#..#.
// ..#.#...#.#
// .#...##..#.
// ..#.##.....
// .#.#.#....#
// .#........#
// #.##...#...
// #...##....#
// .#..#...#.#
// `.trim();

const inputStr = fs.readFileSync("./day-03-input.txt").toString().trim();
console.log(treesEncountered(inputStr, { right: 1, down: 2 }));
console.log(part2(inputStr));
