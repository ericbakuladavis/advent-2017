const fs = require('fs');
let input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('').map((str) => parseInt(str));

let sum = 0;

for (let i = 0; i < input.length; i++){
    let curNum = input[i];
    let nextNumIndex = ( i + input.length / 2 ) % input.length;
    let nextNum = input[nextNumIndex];

    if (curNum === nextNum)
        sum += curNum;
}

console.log(sum);