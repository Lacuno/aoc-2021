const fileContent = await Deno.readTextFile('./inputs/day2.txt')
const input = fileContent
    .split('\n')
    .map(x => x.split(" "))
    .map(x => {
        return {
            command: x[0],
            value: +x[1]
        }
    });
let x, depth, aim = 0;
part1();
part2();

function part1() {
    manover(inp => x += inp.value,
        inp => depth += inp.value,
        inp => depth -= inp.value
    );
}

function part2() {
    manover(inp => {
            x += inp.value;
            depth += aim * inp.value;
        },
        inp => aim += inp.value,
        inp => aim -= inp.value
    );
}

function manover(forwardFn, downFn, upFn) {
    x = 0;
    depth = 0;
    aim = 0;
    for (let inp of input) {
        switch (inp.command) {
            case 'forward':
                forwardFn(inp);
                break;
            case 'down':
                downFn(inp);
                break;
            case 'up':
                upFn(inp);
                break;
        }
    }
    console.log(x * depth);
}
