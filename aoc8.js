import { createRequire } from "https://deno.land/std/node/module.ts";

const require = createRequire(import.meta.url);
const itertools = require("itertools");

const fileContent = await Deno.readTextFile('./inputs/day8.txt')
const input = fileContent
    .split('\n')
    .filter(x => x !== '')
    .map(x => {
        const y = x.split(/\s+\|\s+/);
        return {
            inputValues: y[0].split(/\s+/),
            outputValues: y[1].split(/\s+/)
        }
    });

part1();
part2();

function part1() {
    console.log(input
        .flatMap(x => x.outputValues)
        .filter(x => x.length === 2 || x.length === 3 || x.length === 4 || x.length === 7)
        .length);
}

function part2() {
    const allInterpretations = [...itertools.permutations('abcdefg')];
    let sum = 0;
    for (let line of input) {
        const validInterpretation = allInterpretations.filter(interpretation => {
            return line.inputValues
                .every(pattern => solve7Segment(pattern, interpretation) !== -1);
        })[0];

        const output = line.outputValues.map(val => solve7Segment(val, validInterpretation))
            .reduce((a, b) => a * 10 + b);
        sum += output;
    }
    console.log(sum);
}

function solve7Segment(pattern, interpretation) {
    const top = interpretation[0];
    const topLeft = interpretation[1];
    const topRight = interpretation[2];
    const middle = interpretation[3];
    const downLeft = interpretation[4];
    const downRight = interpretation[5];
    const down = interpretation[6];

    if (pattern.length === 6 && pattern.includes(top) && pattern.includes(topLeft) && pattern.includes(topRight) && pattern.includes(downLeft) && pattern.includes(downRight) && pattern.includes(down)) {
        return 0;
    }
    if (pattern.length === 2 && pattern.includes(topRight) && pattern.includes(downRight)) {
        return 1;
    }
    if (pattern.length === 5 && pattern.includes(top) && pattern.includes(topRight) && pattern.includes(middle) && pattern.includes(downLeft) && pattern.includes(down)) {
        return 2;
    }
    if (pattern.length === 5 && pattern.includes(top) && pattern.includes(topRight) && pattern.includes(middle) && pattern.includes(downRight) && pattern.includes(down)) {
        return 3;
    }
    if (pattern.length === 4 && pattern.includes(topLeft) && pattern.includes(topRight) && pattern.includes(middle) && pattern.includes(downRight)) {
        return 4;
    }
    if (pattern.length === 5 && pattern.includes(top) && pattern.includes(topLeft) && pattern.includes(middle) && pattern.includes(downRight) && pattern.includes(down)) {
        return 5;
    }
    if (pattern.length === 6 && pattern.includes(top) && pattern.includes(topLeft) && pattern.includes(middle) && pattern.includes(downLeft) && pattern.includes(downRight) && pattern.includes(down)) {
        return 6;
    }
    if (pattern.length === 3 && pattern.includes(top) && pattern.includes(topRight) && pattern.includes(downRight)) {
        return 7;
    }
    if (pattern.length === 7 && pattern.includes(top) && pattern.includes(topLeft) && pattern.includes(topRight) && pattern.includes(middle) && pattern.includes(downLeft) && pattern.includes(downRight) && pattern.includes(down)) {
        return 8;
    }
    if (pattern.length === 6 && pattern.includes(top) && pattern.includes(topLeft) && pattern.includes(topRight) && pattern.includes(middle) && pattern.includes(downRight) && pattern.includes(down)) {
        return 9;
    }

    return -1;  // invalid pattern
}