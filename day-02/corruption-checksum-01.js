var fs = require('fs');
var input = fs.readFileSync("/Users/human/Miscellaneous/Code/advent-2017/day-01/input.txt", 'utf8').split(/[\r\n]+/);

input.push(1);
//input = input.split('\n');

console.log(input.length);