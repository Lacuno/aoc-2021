const fileContent = await Deno.readTextFile('./inputs/day11.txt')
const input = fileContent
    .split('\r\n')
    .filter(x => x !== '')
    .map(x => x.split('').map(Number));

part1();
part2();

function part1() {
    let flashes = 0;
    for (let i = 0; i < 100; i++) {
        for (let y = 0; y < input.length; y++) {
            for (let x = 0; x < input[0].length; x++) {
                flashSim(x, y);
            }
        }

        for (let y = 0; y < input.length; y++) {
            for (let x = 0; x < input[0].length; x++) {
                if (input[y][x] > 9) {
                    input[y][x] = 0;
                    flashes++;
                }
            }
        }
    }
    console.log(flashes);
}

function part2() {
    for (let i = 0; true; i++) {
        for (let y = 0; y < input.length; y++) {
            for (let x = 0; x < input[0].length; x++) {
                flashSim(x, y);
            }
        }

        let flashesThisCycle = 0;
        for (let y = 0; y < input.length; y++) {
            for (let x = 0; x < input[0].length; x++) {
                if (input[y][x] > 9) {
                    flashesThisCycle++;
                    input[y][x] = 0;
                }
            }
        }
        if (flashesThisCycle === 100) {
            console.log(i + 100);   // We already did 100 cycles in part1
            break;
        }
    }
}

function flashSim(x, y) {
    if (x < 0 || y < 0 || y >= input.length || x >= input[0].length) {
        return;
    }

    input[y][x]++;
    if (input[y][x] > 9 && input[y][x] < 1000) {
        input[y][x] = 1000;

        flashSim(x - 1, y - 1);
        flashSim(x, y - 1);
        flashSim(x + 1, y - 1);
        flashSim(x - 1, y);
        flashSim(x + 1, y);
        flashSim(x - 1, y + 1);
        flashSim(x, y + 1);
        flashSim(x + 1, y + 1);
    }
}

