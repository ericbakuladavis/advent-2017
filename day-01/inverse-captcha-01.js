const fs = require('fs');
let input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8');

let sum = 0;

for (let i = 0; i < input.length - 1; i++){
    if (input[i] === input[i + 1])
        sum += parseInt(input[i]);
}

console.log(sum);