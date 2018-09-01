var fs = require('fs');
var input = fs.readFileSync("input.txt", 'utf8').split('\n');
<<<<<<< HEAD

=======
>>>>>>> 20f60edbadd450cadd314b9f4492677d8956f3f2
let length = input.length;
let count = 0;
input.forEach((line) => {
    let splitLine = line.split(' ');
    if (splitLine.every((word) => splitLine.indexOf(word) === splitLine.lastIndexOf(word)))
        count++;
});
console.log(count);
<<<<<<< HEAD
console.log(length);
=======
>>>>>>> 20f60edbadd450cadd314b9f4492677d8956f3f2
