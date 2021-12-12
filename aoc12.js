const graph = {};
const fileContent = await Deno.readTextFile('./inputs/day12.txt')
fileContent
    .split('\r\n')
    .filter(x => x !== '')
    .forEach(x => {
        const a = x.split('-');
        addToGraph(a[0], a[1]);
        addToGraph(a[1], a[0]);
    });

function addToGraph(name, edge) {
    if(name in graph) {
        graph[name].edges.push(edge);
    } else {
        graph[name] = {
            name,
            edges: [edge],
            visited: false
        };
    }
}

part1();
part2();

function part1() {
    // Interpret singelCaveTwice=true as: a small cave has already been visited once:
    // => No small cave can be visited twice
    console.log(recursiveVisit( graph['start'], true));
}

function part2() {
    console.log(recursiveVisit(graph['start'], false));
}

function recursiveVisit(elem, singleCaveTwice) {
    const visitedStore = elem.visited;
    if (elem.visited && elem.name === elem.name.toLowerCase()) {
        if (elem.name === 'start') {
            return 0;
        }
        if (singleCaveTwice) {
            return 0;
        }
        singleCaveTwice = true;
    }
    if (elem.name === 'end') {
        return 1;
    }

    elem.visited = true;
    let sum = 0;
    for (let x of elem.edges) {
        sum += recursiveVisit(graph[x], singleCaveTwice);
    }
    elem.visited = visitedStore;
    return sum;
}
