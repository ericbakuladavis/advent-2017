function convertToHexadecimal(list){
    return list.map((num) => num.toString(16).padStart(2, "0"));
}

function condenseHash(list, blockSize){
    const condensedHash = [];
    for (let i = 0; i < list.length; i += blockSize){
        const block = list.slice(i, i + blockSize);
        const blockString = block.join(' ^ ');
        condensedHash.push(eval(blockString));
    }
    return condensedHash;
}

function applyTwists(list, input, rounds){

    list = list.slice();
    let currentPosition = 0,
        skipSize = 0,
        leftIndex,
        rightIndex;

    // For as many rounds as specified...
    for (let i = 0; i < rounds; i++){
        // For each length in the input...
        input.forEach((length) => {
            // Define how many swap operations are needed. Establish left and right idicies (account for wrapping).
            // Note: If length is 1 or 0, no swap operations will be performed.
            // "left" and "right" are used loosely because the left index can be greater than the right index due to wrapping.
            const swapOpperations = Math.floor(length / 2);
            leftIndex = currentPosition;
            rightIndex = (leftIndex + length - 1 + list.length) % list.length;
            // For as many swap operations as we need...
            for (let i = 0; i < swapOpperations; i++){
                // Swap the numbers at the left and right indices
                leftNum = list[leftIndex];
                rightNum = list[rightIndex];
                list[leftIndex] = rightNum;
                list[rightIndex] = leftNum;
                // Incriment the left index and decriment the right index (account for wrapping)
                leftIndex = (leftIndex + 1) % list.length;
                rightIndex = (rightIndex - 1 + list.length) % list.length;
           }
           // Change the current position and the skip size. Account for wrapping.
           currentPosition = (currentPosition + length + skipSize) % list.length;
           skipSize++;
        });
    }
    return list;
}

function generateList(listLength){
    const list = [];
    for (let i = 0; i < listLength; i++){
        list.push(i);
    }
    return list;
}

function appendGivenNumbers(input){
    return input.concat([17, 31, 73, 47, 23]);
}

function convertToAscii(input){
    return input.map((character) => character.charCodeAt(0));
}

function knotHash(input, strength, rounds){
    if (strength === 'strong'){
        input = input.split('');
        input = convertToAscii(input);
        input = appendGivenNumbers(input);
    }
    if (strength === 'weak')
        input = input.split(',').map((num) => parseInt(num));

    let list = generateList(256);
    list = applyTwists(list, input, rounds);

    if (strength === 'strong'){
        list = condenseHash(list, 16);
        list = convertToHexadecimal(list);
        return list.join('');
    }
    if (strength === 'weak')
        return list[0] * list[1];
}

const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8');

console.log('weak hash:', knotHash(input, 'weak', 1)); // 40132
console.log('strong hash:', knotHash(input, 'strong', 64)); // 35b028fe2c958793f7d5a61d07a008c8