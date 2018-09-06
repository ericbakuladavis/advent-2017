const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n').map((line) => line.split('\t'));

const answer = input.reduce((sum, line) => sum + Math.max(...line) - Math.min(...line),0);

console.log(answer);