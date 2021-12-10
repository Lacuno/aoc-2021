const fileContent = await Deno.readTextFile('./inputs/day10.txt')
const input = fileContent
    .split('\r\n')
    .filter(x => x !== '');

const matches = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>',
};
part1();
part2();

function part1() {
    const sum = analyse()
        .filter(x => x.syntaxError)
        .map(({elem}) => {
            switch (elem) {
                case ')': return 3;
                case ']': return 57;
                case '}': return 1197;
                case '>': return 25137;
            }
        })
        .reduce((a, b) => a + b);

    console.log(sum);
}

function part2() {
    const scores = analyse()
        .filter(x => !x.syntaxError)
        .map(x => {
            const stack = x.elem
            return stack
                .reverse()
                .map(x => {
                    switch (x) {
                        case '(': return 1;
                        case '[': return 2;
                        case '{': return 3;
                        case '<': return 4;
                    }
                })
                .reduce((a, b) => a * 5 + b)
        })
        .sort((a, b) => a - b);

    console.log(scores[Math.floor(scores.length / 2)]);
}

function analyse() {
    return input.map(line => {
        const stack = [];

        for (let x of line) {
            if (x in matches) {
                stack.push(x);
            } else {
                let y = stack.pop();
                if (x === matches[y]) continue;
                return {
                    syntaxError: true,
                    elem: x
                };
            }
        }
        return {
            syntaxError: false,
            elem: stack
        };
    });
}