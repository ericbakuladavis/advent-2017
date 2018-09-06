const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n').map((line) => line.split('\t'));

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