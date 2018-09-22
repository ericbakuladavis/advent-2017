function flagGroup (binaryHashes, row, column){
    binaryHashes[row][column] = "x";
    if (binaryHashes[row - 1] !== undefined && binaryHashes[row - 1][column] === "1")
        flagGroup (binaryHashes, row - 1, column);
    if (binaryHashes[row + 1] !== undefined && binaryHashes[row + 1][column] === "1")
        flagGroup (binaryHashes, row + 1, column);
    if (binaryHashes[row][column - 1] === "1")
        flagGroup (binaryHashes, row, column - 1);
    if (binaryHashes[row][column + 1] === "1")
        flagGroup (binaryHashes, row, column + 1);
}

function countGroups (input){
    const binaryHashes = generateBinaryHashes(input);
    let count = 0;
    for (let row = 0; row < binaryHashes.length; row++){
        for (let column = 0; column < binaryHashes.length; column++){
            const bit = binaryHashes[row][column];
            if (bit === "1"){
                count++;
                flagGroup(binaryHashes, row, column);
            }
        }
    }
    return count;
}

function countOnes(binaryHashes){
    let count = 0;
    binaryHashes.forEach((binaryHash) => {
       binaryHash.forEach((num) => {
           if (num === "1")
                count++; 
       });
    });
    return count;
}

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

function generateHashInputs(input){
    const hashInputs = [];
    for (let i = 0; i < 128; i++){
        hashInputs.push(input + '-' + i)
    }
    return hashInputs;
}

function generateBinaryHashes(input){
    const hashInputs = generateHashInputs(input);
    const knotHashes = hashInputs.map((hashInput) => knotHash(hashInput, 'strong', 64));
    return knotHashes.map((knotHash) => {
        let binaryHash = '';
        for (let i = 0; i < knotHash.length; i++){
            const character = knotHash[i];
            const binaryCharacter = parseInt(character, 16).toString(2).padStart(4, "0");
            binaryHash += binaryCharacter;
        }
        return binaryHash.split('');
    });
}

function countUsedSquares(input){
    const binaryHashes = generateBinaryHashes(input);
    return countOnes(binaryHashes);
}

const input = 'jzgqcdpd'

console.log('Used squares on the disk:', countUsedSquares(input));
console.log('Groups on the disk:', countGroups(input));