function convertToHexadecimal(list){
    list = list.map((num) => {
        hexNum = num.toString(16);
        if (hexNum.length === 1)
            hexNum = '0' + hexNum;
        return hexNum
    });
    return list;
}

function condenseHash(list, blockSize){
    let condensedHash = [];
    for (let i = 0; i < list.length; i += blockSize){
        let block = list.slice(i, i + blockSize);
        let blockString = block.join(' ^ ');
        condensedHash.push(eval(blockString));
    }
    return condensedHash;
}

function applyTwists(list, input, rounds){
    list = list.slice();
    let currentPosition = 0;
    let skipSize = 0;
    let leftIndex;
    let rightIndex;

    // For as many rounds as specified...
    for (let i = 0; i < rounds; i++){
        // For each length in the input...
        input.forEach((length) => {
            // Define how many swap operations are needed. Establish left and right idicies (account for wrapping).
            // Note: if length equals 1 or 0, no swap operations will be performed.
            // "left" and "right" are used loosely because the left index can be greater than the right index due to wrapping.
            let swapOpperations = Math.floor(length / 2);
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
    let list = [];
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

function knotHash(input){
    input = convertToAscii(input);
    input = appendGivenNumbers(input);
    let list = generateList(256);
    list = applyTwists(list, input, 64);
    list = condenseHash(list, 16);
    list = convertToHexadecimal(list);
    return list.join('');
}

const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('');

console.log(knotHash(input)); // 35b028fe2c958793f7d5a61d07a008c8