const fileContent = await Deno.readTextFile('./inputs/day7.txt')
const input = fileContent
    .split(',')
    .map(Number);

part1();
part2();

function part1() {
    crabMovement(x => x);                       // Each step costs 1, so no transformation needed
}

function part2() {
    const gaussianSum = n => (n * n + n) / 2;   // First step costs 1, then 2, 3, 4. Sum of all of those is the gaussian sum
    crabMovement(gaussianSum);
}

function crabMovement(fuelCostFn) {
    // write hello world

    const max = input.reduce((a, b) => a > b ? a : b);

    let minFuelNeeded = Number.MAX_VALUE;
    for(let i = 0; i < max; i++) {
        const fuelNeeded = input.map(x => fuelCostFn(Math.abs(x - i))).reduce((a, b) => a + b);
        if(fuelNeeded < minFuelNeeded) {
            minFuelNeeded = fuelNeeded;
        }
    }
    console.log(minFuelNeeded);
}
