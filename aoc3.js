const fileContent = await Deno.readTextFile('./inputs/day3.txt')
const input = fileContent
    .split('\n');

const length = input[0].length;

// Part 1:
let resultingBits = "";
for(let bitIdx = 0; bitIdx < length; bitIdx++) {
    let bits = input.map(x => x[bitIdx]);
    resultingBits += bits.filter(bit => bit === '0').length > bits.filter(bit => bit === '1').length ? 0 : 1;
}
const gammaRate = parseInt(resultingBits, 2);
const epsilonRate = parseInt(resultingBits.split('').map(x => x === '0' ? '1' : '0').join(''), 2);
console.log(gammaRate * epsilonRate);

// Part 2:
let iterInput = input;
for(let bitIdx = 0; bitIdx < length; bitIdx++) {
    if(iterInput.length === 1) {
        break;
    }

    let bits = iterInput.map(x => x[bitIdx]);
    const filterBit = bits.filter(bit => bit === '0').length > bits.filter(bit => bit === '1').length ? '0' : '1';
    iterInput = iterInput.filter(x => x[bitIdx] === filterBit);
}
const oxygenGeneratorRating = parseInt(iterInput[0], 2);

iterInput = input;
for(let bitIdx = 0; bitIdx < length; bitIdx++) {
    if(iterInput.length === 1) {
        break;
    }

    let bits = iterInput.map(x => x[bitIdx]);
    const filterBit = bits.filter(bit => bit === '0').length <= bits.filter(bit => bit === '1').length ? '0' : '1';
    iterInput = iterInput.filter(x => x[bitIdx] === filterBit);
}
const co2ScrubberRating = parseInt(iterInput[0], 2);
console.log(oxygenGeneratorRating * co2ScrubberRating);

