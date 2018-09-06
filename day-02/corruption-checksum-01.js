const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n');

const answer = input.reduce((sum, line) => {
    line = line.split('\t');
    return sum + Math.max(...line) - Math.min(...line);
},0);

console.log(answer);