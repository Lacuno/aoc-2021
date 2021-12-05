const fileContent = await Deno.readTextFile('./inputs/day5.txt')
const input = fileContent
    .split('\n')
    .filter(x => x !== '')
    .map(row => {
        const match = row.match(/(\d+),(\d+)\s*->\s*(\d+),(\d+)/);
        return {
            x1: +match[1],
            y1: +match[2],
            x2: +match[3],
            y2: +match[4]
        };
    });

part1();
part2();

function part1() {
    simpleBresenham(true);
}

function part2() {
    simpleBresenham(false);
}

function simpleBresenham(skipDiagonals) {
    const field = Array(1000).fill().map(() => Array(1000).fill(0));
    for (let {x1, x2, y1, y2} of input) {
        let dx;
        if (x1 < x2) dx = 1;
        else if (x1 === x2) dx = 0;
        else dx = -1;

        let dy;
        if (y1 < y2) dy = 1;
        else if (y1 === y2) dy = 0;
        else dy = -1;

        if (skipDiagonals && dx != 0 && dy != 0) {
            continue;
        }

        for (let x = x1, y = y1; true; x += dx, y += dy) {
            field[y][x]++;
            if (x == x2 && y == y2) break;
        }
    }

    console.log(field.flatMap(x => x).filter(x => x > 1).length);
}
