var fs = require('fs');
var input = fs.readFileSync("/home/eric/Code/advent-2017/day-04/input.txt", 'utf8').split('\n').map((phrase) => phrase.split(' '));

let length = input.length;
let count = 0;

input.forEach((phrase) => {
    if (phrase.every((word) => phrase.indexOf(word) === phrase.lastIndexOf(word)))
        count++;
});

console.log(count);
