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

let x = 0;
let depth = 0;
for (let inp of input) {
    switch (inp.command) {
        case 'forward':
            x += inp.value;
            break;
        case 'down':
            depth += inp.value;
            break;
        case 'up':
            depth -= inp.value;
            break;
    }
}
console.log(x * depth);

x = 0;
depth = 0;
let aim = 0;
for (let inp of input) {
    switch (inp.command) {
        case 'forward':
            x += inp.value;
            depth += aim * inp.value;
            break;
        case 'down':
            aim += inp.value;
            break;
        case 'up':
            aim -= inp.value;
            break;
    }
}
console.log(x * depth);
