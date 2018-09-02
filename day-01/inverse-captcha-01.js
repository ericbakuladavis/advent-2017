var fs = require('fs');
var input = fs.readFileSync("/Users/human/Miscellaneous/Code/advent-2017/day-01/input.txt", 'utf8');

input += input[0];

let sum = 0;

for (let i = 0; i < input.length - 1; i++){
    if (input[i] === input[i + 1])
        sum += parseInt(input[i]);
}

console.log(sum);