const fileContent = await Deno.readTextFile('./inputs/day4.txt')
const input = fileContent
    .split('\n');
const draws = input[0].split(',');

const boards = [];
let boardsToLookAt = [];

for (let i = 2; i + 5 < input.length; i += 6) {
    const nextBoard = input.slice(i, i + 5)
        .map(row => row.split(/\s+/)
            .map(elem => {
                return {marked: false, value: elem}
            })
        );
    boards.push(nextBoard);
}

part1();
part2();

function part1() {
    bingoGame((board, draw) => {
        calculateResult(board, draw);
        return true;
    });
}

function part2() {
    bingoGame((board, draw) => {
        boardsToLookAt = boardsToLookAt.filter(b => b != board);
        if (boardsToLookAt.length === 0) {
            calculateResult(board, draw);
            return true;
        }
    });
}

function bingoGame(onBingoFn) {
    boardsToLookAt = boards;
    for (let draw of draws) {
        for (let board of boardsToLookAt) {
            const [x, y] = findOnBoard(board, draw);
            if (x === -1) {
                continue;
            }
            board[y][x].marked = true;
            if (isBingo(board, x, y) && onBingoFn(board, draw)) {
                return;
            }
        }
    }
}

function calculateResult(board, draw) {
    const nonMarkedSum = board
        .flatMap(x => x)
        .filter(x => !x.marked)
        .map(x => +x.value)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    console.log(nonMarkedSum * (+draw));
}

function findOnBoard(board, num) {
    for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {
            if (board[y][x].value === num) {
                return [x, y];
            }
        }
    }
    return [-1, -1];
}

// Look if every elem in the row or column is marked
function isBingo(board, x, y) {
    return board[y].every(elem => elem.marked) || board.map(row => row[x]).every(elem => elem.marked);
}
