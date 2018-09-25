function countStepsUntilExit1(input){
  input = input.slice();
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

function countStepsUntilExit2(input){
  input = input.slice();
  let index = 0;
  let count = 0;
  while (input[index] !== undefined){
    const offset = input[index];
    if (offset >= 3)
      input[index]--;
    else
      input[index]++;
    index += offset;
    count++;
  }
  return count;
}

const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n').map((str) => parseInt(str));

console.log(countStepsUntilExit1(input)); // 396086
console.log(countStepsUntilExit2(input)); // 28675390