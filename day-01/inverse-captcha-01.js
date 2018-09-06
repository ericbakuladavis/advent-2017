const fs = require('fs');
let input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('').map((str) => parseInt(str));

let sum = 0;

for (let i = 0; i < input.length; i++){
    let curNum = input[i];
    let nextNum = input[i + 1];

    if (i === input.length - 1)
        nextNum = input[0];

    if (curNum === nextNum)
        sum += curNum;
}

console.log(sum);