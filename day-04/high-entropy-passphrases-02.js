var fs = require('fs');
var input = fs.readFileSync("input.txt", 'utf8').split('\n');

function wordIsValid(word, splitPhrase){
    // DO SOME STUFF HERE
}

let length = input.length;
let count = 0;

input.forEach((phrase) => {
    let splitPhrase = phrase.split(' ');

    let phraseIsValid = splitPhrase.every((word) => wordIsValid(word, splitPhrase));

    if (isValid)
        count++;
});
console.log(count);
