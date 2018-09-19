function containsNoAnagrams(phrase){
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

function containsNoDuplicates(phrase){
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

function countValidPhrases(input, phraseIsValid){
    let count = 0;
    input.forEach((phrase) => {
        if (phraseIsValid(phrase))
            count++;
    });
    return count;
}

const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n').map((phrase) => phrase.split(' '));

console.log('phrases without duplicates: ', countValidPhrases(input, containsNoDuplicates)); // 386
console.log('phrases without anagrams: ', countValidPhrases(input, containsNoAnagrams)); // 208