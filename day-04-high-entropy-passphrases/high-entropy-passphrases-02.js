function phraseIsValid(phrase){
    let seen = new Set();
    for (let i = 0; i < phrase.length; i++){
        let word = phrase[i];
        let sortedWord = word.split('').sort().toString();
        if (seen.has(sortedWord))
            return false;
        else
            seen.add(sortedWord);
    }
    return true;
}

function countValidPhrases(input){
    let count = 0;
    input.forEach((phrase) => {
        if (phraseIsValid(phrase))
            count++;
    });
    return count;
}

const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n').map((phrase) => phrase.split(' '));

console.log(countValidPhrases(input)); // 208