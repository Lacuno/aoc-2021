const fileContent = await Deno.readTextFile('./inputs/day1.txt')
const numbers = fileContent.split('\n').map(x => +x);

let lastNum = numbers[0];
let nrIncrements = 0;
for(let num of numbers) {
    if(num > lastNum) {
        nrIncrements++;
    }
    lastNum = num;
}
console.log(nrIncrements);

let lastSum = numbers[0] + numbers[1] + numbers[2];
nrIncrements = 0;
for(let i = 3; i < numbers.length; i++) {
    const sum = lastSum + numbers[i] - numbers[i-3];
    if(sum > lastSum) {
        nrIncrements++;
    }
    lastSum = sum;
}

console.log(nrIncrements);
