var fs = require('fs');
var input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n').map((phrase) => phrase.split(' '));

function areAnagrams(word, otherWord){
    return word.split('').sort().toString() === otherWord.split('').sort().toString();
}

function isValid(phrase){
    return phrase.every((word, index) => phrase.every((otherWord, otherIndex) => !areAnagrams(word, otherWord) || index === otherIndex));
}

let count = 0;

input.forEach((phrase) => {
    if (isValid(phrase))
        count++;
});

console.log(count);
