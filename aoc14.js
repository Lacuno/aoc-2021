import {createRequire} from "https://deno.land/std/node/module.ts";

const require = createRequire(import.meta.url);
const immutable = require("immutable");

const fileContent = await Deno.readTextFile('./inputs/day14.txt')

const lines = fileContent
    .split('\r\n');
let pattern = lines[0];
const commands = lines.slice(2)
    .map(line => {
        const x = line.split(' -> ');
        return {
            from: x[0],
            to: x[1]
        }
    })

part1();
part2();

function part1() {
    let [max, min] = iterate(10);
    console.log(max - min);
}

function part2() {
    let [max, min] = iterate(40);
    console.log(max - min);
}

function iterate(nrIterations) {
    let patternMap = immutable.Map();
    for (let i = 0; i < pattern.length - 1; i++) {
        // Create tuples with initial values
        patternMap = patternMap.update(pattern[i] + pattern[i + 1], 0, count => count + 1);
    }

    for (let i = 0; i < nrIterations; i++) {
        patternMap = step(patternMap);
    }
    let results = immutable.Map();
    for (let [tuple, count] of patternMap) {
        results = results.update(tuple[0], 0, oldCount => oldCount + count);
    }
    results = results.update(pattern[pattern.length - 1], 1, count => count + 1);
    return [results.max(), results.min()];
}

function step(patternMap) {
    let nextPatternsMap = immutable.Map();

    for (let [tuple, count] of patternMap) {
        const command = commands.find(c => c.from === tuple);
        if (!command) continue;

        nextPatternsMap = nextPatternsMap.update(tuple[0] + command.to, 0, oldCount => oldCount + count);
        nextPatternsMap = nextPatternsMap.update(command.to + tuple[1], 0, oldCount => oldCount + count);
    }

    return nextPatternsMap;
}
