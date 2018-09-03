var fs = require('fs');
var input = fs.readFileSync("input.txt", 'utf8').split('\n');

let length = input.length;
let count = 0;
input.forEach((line) => {
    let splitLine = line.split(' ');
    if (splitLine.every((word) => splitLine.indexOf(word) === splitLine.lastIndexOf(word)))
        count++;
});
console.log(count);
