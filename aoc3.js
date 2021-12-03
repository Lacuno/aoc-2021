const fileContent = await Deno.readTextFile('./inputs/day3.txt')
const input = fileContent
    .split('\n');
const length = input[0].length;

part1();
part2();

function part1() {
    let resultingBits = "";
    for (let bitIdx = 0; bitIdx < length; bitIdx++) {
        let bits = input.map(x => x[bitIdx]);
        resultingBits += bits.filter(bit => bit === '0').length > bits.filter(bit => bit === '1').length ? 0 : 1;
    }
    const gammaRate = parseInt(resultingBits, 2);
    const epsilonRate = parseInt(resultingBits.split('').map(x => x === '0' ? '1' : '0').join(''), 2);
    console.log(gammaRate * epsilonRate);
}

function part2() {
    const oxygenGeneratorRating = parseInt(iterateAndFilterInput((arr1, arr2) => arr1.length > arr2.length), 2);
    const co2ScrubberRating = parseInt(iterateAndFilterInput((arr1, arr2) => arr1.length <= arr2.length), 2);
    console.log(oxygenGeneratorRating * co2ScrubberRating);
}

function iterateAndFilterInput(predicate) {
    let iterInput = input;
    for (let bitIdx = 0; bitIdx < length; bitIdx++) {
        if (iterInput.length === 1) {
            break;
        }

        let bits = iterInput.map(x => x[bitIdx]);
        // Finds most/least common value in array according to predicate
        const filterBit = predicate(bits.filter(bit => bit === '0'), bits.filter(bit => bit === '1')) ? '0' : '1';
        iterInput = iterInput.filter(x => x[bitIdx] === filterBit);
    }
    return iterInput[0];
}
