const fs = require('fs');
let input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('').map((str) => parseInt(str));

let sum = 0;

// we only loop through the first half of the numbers
// as we go, we check each number with it's coorisponding number in the 2nd half
for (let i = 0; i < input.length / 2; i++){
    let curNum = input[i];
    let nextNumIndex = i + input.length / 2;
    let nextNum = input[nextNumIndex];

    if (curNum === nextNum)
        sum += curNum + nextNum;
}

console.log(sum);