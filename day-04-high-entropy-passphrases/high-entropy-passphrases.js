function containsNoAnagrams(phrase){
    const seen = new Set();
    for (let i = 0; i < phrase.length; i++){
        const word = phrase[i];
        const sortedWord = word.split('').sort().toString();
        if (seen.has(sortedWord))
            return false;
        else
            seen.add(sortedWord);
    }
    return true;
}

function containsNoDuplicates(phrase){
    const seen = new Set();
    for (let i = 0; i < phrase.length; i++){
        const word = phrase[i];
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