var fs = require('fs');
var input = fs.readFileSync("/home/eric/Code/advent-2017/day-02/input.txt", 'utf8').split('\n');

let sum = 0;

input.forEach((line) => {
    line = line.split('\t');
    line.forEach((number, index) => {
        line.forEach((otherNumber, otherIndex) =>{
            if (otherNumber % number === 0 && otherIndex !== index )
                sum += otherNumber / number;
        });
    });
});

console.log(sum);