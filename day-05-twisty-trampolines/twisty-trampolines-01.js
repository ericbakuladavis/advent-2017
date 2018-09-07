const fs = require('fs');
let input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n').map((str) => parseInt(str));
let index = 0;
let count = 0;

while (input[index] !== undefined){
  input[index]++;
  index += input[index] - 1;
  count++;
}

console.log(count);