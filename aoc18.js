const fileContent = await Deno.readTextFile('./inputs/day18.txt')
const lines = fileContent
    .split('\n');

const input = lines
    .filter(x => x !== '')
    .map(x => JSON.parse(x));
let tree = null;

part1();
part2();

function part1() {
    for (let idx = 0; idx < input.length; idx++) {
        const nextTree = makeTree(input[idx]);
        tree = combineTrees(tree, nextTree);
        reduceTree(tree)
    }
    console.log(calcMagnitude(tree));
}

function part2() {
    let maxMagnitude = 0;
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input.length; j++) {
            if (i === j) continue;

            const firstTree = makeTree(input[i]);
            const nextTree = makeTree(input[j]);
            tree = combineTrees(firstTree, nextTree);
            reduceTree(tree);
            const mag = calcMagnitude(tree);
            if (mag > maxMagnitude) {
                maxMagnitude = mag;
            }
        }
    }
    console.log(maxMagnitude);
}

function reduceTree(t) {
    let run = true;
    do {
        let changes = explode(t, 0);
        if (changes) {
            continue;
        }
        run = split(t);
    } while (run);
}

function calcMagnitude(tree) {
    if (tree.hasOwnProperty("value")) {
        return tree.value;
    } else {
        return 3 * calcMagnitude(tree.left) + 2 * calcMagnitude(tree.right);
    }
}

function makeTree(array) {
    if (Array.isArray(array)) {
        const left = makeTree(array[0]);
        const right = makeTree(array[1]);

        const node = {
            left,
            right,
            parent: null
        }

        left.parent = node;
        right.parent = node;
        return node;
    } else {
        return {
            value: array
        }
    }
}

function combineTrees(t1, t2) {
    if (t1 === null) {
        return t2;
    }
    if (t2 === null) {
        return t1;
    }

    const node = {
        left: t1,
        right: t2,
        parent: null
    };
    t1.parent = node;
    t2.parent = node;
    return node;
}

function split(treeNode) {
    if (treeNode.hasOwnProperty('value')) {
        if (treeNode.value >= 10) {
            const newLeftNode = {
                value: Math.floor(treeNode.value / 2)
            }
            const newRightNode = {
                value: Math.ceil(treeNode.value / 2)
            }

            const splitNodes = {
                left: newLeftNode,
                right: newRightNode,
                parent: treeNode.parent
            };
            newLeftNode.parent = splitNodes;
            newRightNode.parent = splitNodes;

            if (treeNode.parent.left === treeNode) {
                treeNode.parent.left = splitNodes;
            }
            if (treeNode.parent.right === treeNode) {
                treeNode.parent.right = splitNodes;
            }
            return true;
        }
    } else {
        if (split(treeNode.left)) {
            return true;
        }
        if (split(treeNode.right)) {
            return true;
        }
    }
    return false;
}

function explode(treeNode, currDepth) {
    if (!treeNode.hasOwnProperty('value')) {
        // not a leaf-node
        if (currDepth >= 4 && treeNode.left.hasOwnProperty('value') && treeNode.right.hasOwnProperty('value')) {
            // Explode!
            const leftVal = treeNode.left.value;
            let origin = treeNode.left;
            let treeIter = treeNode;
            let found = false;
            // Go up until we can go left once
            while (treeIter !== null) {
                if (treeIter.left !== origin) {
                    found = true;
                    break;
                }
                origin = treeIter;
                treeIter = treeIter.parent;
            }

            if (found) {
                // go as far right as possible
                let newTreeIter = treeIter.left;
                while (!newTreeIter.hasOwnProperty('value')) {
                    newTreeIter = newTreeIter.right;
                }
                newTreeIter.value += leftVal;
            }

            const rightVal = treeNode.right.value;
            origin = treeNode.right;
            treeIter = treeNode;
            found = false;
            // Go up until we can go right once
            while (treeIter !== null) {
                if (treeIter.right !== origin) {
                    found = true;
                    break;
                }
                origin = treeIter;
                treeIter = treeIter.parent;
            }

            if (found) {
                // go as far right as possible
                let newTreeIter = treeIter.right;
                while (!newTreeIter.hasOwnProperty('value')) {
                    newTreeIter = newTreeIter.left;
                }
                newTreeIter.value += rightVal;
            }

            if (treeNode.parent.left === treeNode) {
                treeNode.parent.left = {
                    value: 0,
                    parent: treeNode.parent
                };
            } else if (treeNode.parent.right === treeNode) {
                treeNode.parent.right = {
                    value: 0,
                    parent: treeNode.parent
                };
            }

            return true;
        } else {
            if (treeNode.hasOwnProperty("left")) {
                if (explode(treeNode.left, currDepth + 1)) {
                    return true;
                }
            }
            if (treeNode.hasOwnProperty("right")) {
                if (explode(treeNode.right, currDepth + 1)) {
                    return true;
                }
            }
        }
        return false;
    }
}
