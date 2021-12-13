const fileContent = await Deno.readTextFile('./inputs/day13.txt')
const lines = fileContent
    .split('\r\n');

const idxOfSeparator = lines.indexOf('')
const dots = lines.slice(0, idxOfSeparator).map(line => {
    const dot = line.split(',');
    return {
        x: +dot[0],
        y: +dot[1]
    }
});
const maxX = Math.max(...dots.map(x => x.x)) + 1;
const maxY = Math.max(...dots.map(x => x.y)) + 1;

let input = Array.from(Array(maxY), () => new Array(maxX).fill('.'));
const commands = lines.slice(idxOfSeparator + 1).map(line => {
    const command = line.split(' ');
    const where = command[2].split("=")
    return {
        isX: where[0] === 'x',
        val: +where[1]
    };
});

dots.forEach(dot => {
    input[dot.y][dot.x] = '#';
});

part1();
part2();

function part1() {
    fold(commands[0].isX, commands[0].val);
    console.log(input.flatMap(x => x).filter(x => x === '#').length);
}

function part2() {
    commands.slice(1).forEach(command => {
        fold(command.isX, command.val);
    });

    console.log(input.map(x => x.join('').replaceAll('.', ' ')));
}

function fold(isX, position) {
    if (isX) {
        // fold to left
        const newMaxX = position;
        const newInput = Array.from(Array(input.length), () => new Array(newMaxX).fill('.'));
        for (let y = 0; y < input.length; y++) {
            for (let x = 0; x < newMaxX; x++) {
                newInput[y][x] = input[y][x];
            }
        }
        for (let y = 0; y < input.length; y++) {
            for (let x = position + 1, i = position - 1; x < input[0].length; x++, i--) {
                if (newInput[y][i] === '.') {
                    newInput[y][i] = input[y][x];
                }
            }
        }

        input = newInput;
    } else {
        // fold up
        const newMaxY = position;
        const newInput = Array.from(Array(newMaxY), () => new Array(input[0].length).fill('.'));
        for (let y = 0; y < newMaxY; y++) {
            for (let x = 0; x < input[0].length; x++) {
                newInput[y][x] = input[y][x];
            }
        }
        for (let y = position + 1, i = position - 1; y <= position + newMaxY; y++, i--) {
            for (let x = 0; x < input[0].length; x++) {
                if (newInput[i][x] === '.') {
                    newInput[i][x] = input[y][x];
                }
            }
        }
        input = newInput;
    }
}
