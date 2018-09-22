function countStepsUntilExit(input){
  let index = 0;
  let count = 0;
  while (input[index] !== undefined){
    const offset = input[index];
    input[index]++;
    index += offset;
    count++;
  }
  return count;
}

const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n').map((str) => parseInt(str));

console.log(countStepsUntilExit(input)); // 396086