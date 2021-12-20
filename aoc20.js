const fileContent = await Deno.readTextFile('./inputs/day20.txt')
const lines = fileContent
    .split('\n')

const enhancementAlg = lines[0];
let image = lines.slice(2);
let border = '.';

part1();
part2();

function part1() {
    for (let i = 0; i < 2; i++) {
        kernelFold();
    }
    console.log(image.flatMap(x => x).filter(x => x === '#').length);
}

function part2() {
    for (let i = 0; i < 48; i++) {
        kernelFold();
    }
    console.log(image.flatMap(x => x).filter(x => x === '#').length);
}

function kernelFold() {
    const xLen = image.length;
    const yLen = image[0].length;

    const newImage = Array.from(Array(yLen + 2), () => new Array(xLen + 2).fill('.'));
    for (let y = -1; y <= yLen; y++) {
        for (let x = -1; x <= xLen; x++) {
            let code = '';
            for (let i = y - 1; i <= y + 1; i++) {
                for (let j = x - 1; j <= x + 1; j++) {
                    if ((image[i]?.[j] ?? border) === '#') {
                        code += '1';
                    } else {
                        code += '0';
                    }
                }
            }
            let idx = parseInt(code, 2);
            newImage[y + 1][x + 1] = enhancementAlg[idx];
        }
    }
    if (border === '.') {
        border = enhancementAlg[0];
    } else {
        border = enhancementAlg[511];
    }
    image = newImage;
}
