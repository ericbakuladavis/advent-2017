function countStepsUntilExit(input){
  let index = 0;
  let count = 0;
  while (input[index] !== undefined){
    let offset = input[index];
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
let input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n').map((str) => parseInt(str));

console.log(countStepsUntilExit(input)); // 28675390