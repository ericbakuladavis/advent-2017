const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n').map((phrase) => phrase.split(' '));

let count = 0;

input.forEach((phrase) => {
    if (phrase.every((word) => phrase.indexOf(word) === phrase.lastIndexOf(word)))
        count++;
});

console.log(count);