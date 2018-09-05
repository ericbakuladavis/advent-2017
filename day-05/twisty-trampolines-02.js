var fs = require('fs');
var input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n').map((str) => parseInt(str));

let index = 0;
let count = 0;

while (input[index] !== undefined){
  let change = 1;

  if (input[index] >= 3)
    change = -1;
    
  input[index] += change;
  index += input[index] - change;
  count++;
}

console.log(count);