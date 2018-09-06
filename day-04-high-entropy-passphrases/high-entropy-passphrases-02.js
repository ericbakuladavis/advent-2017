const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n').map((phrase) => phrase.split(' '));

function areAnagrams(word, otherWord){
    return word.split('').sort().toString() === otherWord.split('').sort().toString();
}

function containsAnagram(phrase){
    for (let i = 0; i < phrase.length - 1; i++){
        let word = phrase[i];
        for (let j = i + 1; j < phrase.length; j++){
            let otherWord = phrase[j];
            if (areAnagrams(word, otherWord))
                return true;
        }
    }
    return false;
    // We could also replace everything in this function with this line:
    //return phrase.every((word, index) => phrase.every((otherWord, otherIndex) => !areAnagrams(word, otherWord) || index === otherIndex));
}

let count = 0;

input.forEach((phrase) => {
    if (!containsAnagram(phrase))
        count++;
});

console.log(count);
