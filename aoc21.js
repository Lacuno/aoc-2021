const fileContent = await Deno.readTextFile('./inputs/day21.txt')
const lines = fileContent.split('\n');

const p1Start = +lines[0].match(/Player 1 starting position: (\d+)/)[1];
const p2Start = +lines[1].match(/Player 2 starting position: (\d+)/)[1];

let p1 = {
    pos: p1Start,
    score: 0
}
let p2 = {
    pos: p2Start,
    score: 0
}

part1();
part2();

function part1() {
    let dice = 1;

    let currPlayer = p1;
    while (true) {
        const diceRoll = 3 * dice + 3;
        moveForward(currPlayer, diceRoll);
        dice += 3;

        if(currPlayer.score >= 1000) {
            break;
        }
        currPlayer = currPlayer === p1 ? p2 : p1;
    }

    console.log(Math.min(p1.score, p2.score) * (dice - 1));
}

function part2() {
    p1 = {
        pos: p1Start,
        score: 0
    };
    p2 = {
        pos: p2Start,
        score: 0
    }
    console.log(splitUniverse(p1, p2, true));
}

function moveForward(player, diceOutcome) {
    player.pos = ((player.pos - 1 + diceOutcome) % 10) + 1;
    player.score += player.pos;
}

function splitUniverse(p1, p2, p1Turn) {
    if (p1.score >= 21) {
        return 1;
    } else if (p2.score >= 21) {
        return 0;
    }

    const currPlayer = p1Turn ? p1 : p2;
    let sum = 0;
    for (let diceOutcome = 3; diceOutcome <= 9; diceOutcome++) {
        const oldPos = currPlayer.pos;
        const oldScore = currPlayer.score;
        moveForward(currPlayer, diceOutcome);
        const multiplier = diceDistribution(diceOutcome);
        sum += multiplier * splitUniverse(p1, p2, !p1Turn);
        currPlayer.pos = oldPos;
        currPlayer.score = oldScore;
    }
    return sum;
}

function diceDistribution(num) {
    switch (num) {
        case 3: return 1;   // 111
        case 4: return 3;   // 112, 121, 211
        case 5: return 6;   // 113, 131, 311, 122, 212, 221
        case 6: return 7;   // 123, 132, 213, 231, 312, 321, 222
        case 7: return 6;   // 223, 232, 322, 133, 313, 331
        case 8: return 3;   // 233, 323, 332
        case 9: return 1;   // 333
    }
}
