import {saveAccess} from "./array.util.js";

const fileContent = await Deno.readTextFile('./inputs/day9.txt')
const input = fileContent
    .split('\r\n')
    .filter(x => x !== '')
    .map(x => x.split('').map(Number));

part1();
part2();

function part1() {
    console.log(getLowPoints()
        .map(({x, y}) => input[y][x] + 1)
        .reduce((a, b) => a + b));
}

function part2() {
    console.log(
        getLowPoints()
            .map(({x, y}) => recursiveSearch(input[y][x] - 1, x, y))
            .sort((a, b) => a - b)
            .reverse()
            .slice(0, 3)
            .reduce((a, b) => a * b)
    );
}

function getLowPoints() {
    let lowPoints = [];
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            if (input[y][x] < saveAccess(input, x, y + 1, 10) &&
                input[y][x] < saveAccess(input, x, y - 1, 10) &&
                input[y][x] < saveAccess(input, x + 1, y, 10) &&
                input[y][x] < saveAccess(input, x - 1, y, 10)) {
                lowPoints.push({x, y});
            }
        }
    }
    return lowPoints;
}

function recursiveSearch(lastVal, x, y) {
    if (saveAccess(input, x, y) === null) {
        return 0;
    }
    if (input[y][x] === 9 || input[y][x] === -1) {
        return 0;
    }
    input[y][x] = -1;

    return 1 + recursiveSearch(input[y][x], x + 1, y) +
        recursiveSearch(input[y][x], x - 1, y) +
        recursiveSearch(input[y][x], x, y + 1) +
        recursiveSearch(input[y][x], x, y - 1);
}