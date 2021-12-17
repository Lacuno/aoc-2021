const input = await Deno.readTextFile('./inputs/day17.txt');
const match = input.match(/target area: x=(\d+)..(\d+), y=-(\d+)..-(\d+)/);

const target = {
    x1: Number(match[1]),
    x2: Number(match[2]),
    y1: -Number(match[3]),
    y2: -Number(match[4]),
}

part1();
part2();

function part1() {
    console.log(bruteForce()[0]);
}

function part2() {
    console.log(bruteForce()[1]);
}

function bruteForce() {
    let count = 0;
    let maxY = 0;
    for (let y = target.y1; y < 1000; y++) {
        for (let x = 1; x <= target.x2; x++) {
            let currX = x;
            let accumX = 0;
            let currY = y;
            let accumY = 0;
            let maxYForLoop = 0;

            while (accumX <= target.x2 && accumY >= target.y1) {
                accumX += currX;
                accumY += currY;

                if(currX > 0) currX--;
                currY--;

                if(accumY > maxYForLoop) {
                    maxYForLoop = accumY;
                }

                if(accumX >= target.x1 && accumX <= target.x2 && accumY <= target.y2 && accumY >= target.y1) {
                    count++;
                    maxY = maxYForLoop;
                    break;
                }
            }
        }
    }
    return [maxY, count];
}
