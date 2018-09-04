var fs = require('fs');
var input = fs.readFileSync("/home/eric/Code/advent-2017/day-02/input.txt", 'utf8').split('\n').map((line) => line.split('\t'));

let sum = 0;

input.forEach((line) => {
    line.forEach((number, index) => {
        line.forEach((otherNumber, otherIndex) =>{
            if (otherNumber % number === 0 && otherIndex !== index )
                sum += otherNumber / number;
        });
    });
});

console.log(sum);