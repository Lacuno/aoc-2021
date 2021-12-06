const fileContent = await Deno.readTextFile('./inputs/day6.txt')
const input = fileContent
    .split(',')
    .map(x => +x);

part1();
part2();

function part1() {
    simulate(80);
}

function part2() {
    simulate(255);
}

function simulate(nrRounds) {
    let nrFishByAge = [];   // Array with 9 values: Each value is the accumulated nr of fish with that age
                            // E.g. [10,20,30,40,50,60,70,80,90] means that there are 10 fish with age-value 0, 20 fish with age-value 1, etc.
    for (let i = 0; i < 9; i++) {
        nrFishByAge.push(input.filter(x => x === i).length);
    }

    for (let i = 1; i <= nrRounds; i++) {
        let age0 = nrFishByAge[0];
        nrFishByAge.splice(0, 1);
        nrFishByAge.push(0);
        nrFishByAge[6] += age0;
        nrFishByAge[8] += age0;
    }
    console.log(nrFishByAge.reduce((a, b) => a + b));
}
