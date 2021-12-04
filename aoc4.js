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
                    return {
                        marked: false,
                        value: elem
                    }
                }
            )
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
        if(boardsToLookAt.length === 0) {
            calculateResult(board, draw);
            return true;
        }
    });
}

function bingoGame(onBingoFn) {
    boardsToLookAt = boards;
    for(let draw of draws) {
        for(let board of boardsToLookAt) {
            const [x, y] = findOnBoard(board, draw);
            if(x === -1) {
                continue;
            }
            board[y][x].marked = true;
            if(validateBoard(board, x, y) === 'bingo' && onBingoFn(board, draw)) {
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
        .reduce(( accumulator, currentValue ) => accumulator + currentValue, 0);
    console.log(nonMarkedSum * (+draw));
}

function findOnBoard(board, num) {
    for(let y = 0; y < 5; y++) {
        for(let x = 0; x < 5; x++) {
            if(board[y][x].value === num) {
                return [x,y];
            }
        }
    }
    return [-1, -1];
}

function validateBoard(board, x, y) {
    // Look if every elem in the row or column is marked
    if(board[y].every(elem => elem.marked) || board.map(row => row[x]).every(elem => elem.marked)) {
        return 'bingo';
    }

    if(x == y) { // if we are on the main diagonals
        // Look if every elem in the diagonal is marked
        let bingo = true;
        for(let i = 0; i < 5; i++) {
            if(!board[i][i].marked) {
                bingo = false;
            }
        }
        for(let i = 0, j = 4; i < 5; i++, j--) {
            if(!board[j][i].marked) {
                bingo = false;
            }
        }
        if(bingo) {
            return 'bingo';
        }
    }
    return 'no bingo';
}
