function phraseIsValid(phrase){
    let seen = new Set();
    for (let i = 0; i < phrase.length; i++){
        let word = phrase[i];
        if (seen.has(word))
            return false;
        else
            seen.add(word);    
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

console.log(countValidPhrases(input)); // 386