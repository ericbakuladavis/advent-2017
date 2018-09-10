const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n').map((phrase) => phrase.split(' '));

function containsAnagram(phrase){
    let seen = new Set();
    for (let i = 0; i < phrase.length; i++){
        let word = phrase[i];
        let sortedWord = word.split('').sort().toString();
        if (seen.has(sortedWord))
            return true;
        else
            seen.add(sortedWord);
    }
    return false;
}

function countValidPhrases(input){
    let count = 0;
    input.forEach((phrase) => {
        if (!containsAnagram(phrase))
            count++;
    });
    return count;
}

console.log(countValidPhrases(input));