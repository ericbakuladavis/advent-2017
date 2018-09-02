function addEm(start, end, offset){
    for (let i = start; i < end; i++){
        if (input[i] === input[i + offset])
            sum += parseInt(input[i]);
    }
}

const fs = require('fs');
const input = fs.readFileSync("/Users/human/Miscellaneous/Code/advent-2017/day-01/input.txt", 'utf8');

let sum = 0;
const length = input.length
const halfLength = length / 2;

addEm(0, halfLength, halfLength);
addEm(halfLength, length, halfLength * -1);

console.log(sum);