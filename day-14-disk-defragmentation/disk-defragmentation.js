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

const input = 'jzgqcdpd';
const knotHash = require('../functions/knot-hash');

console.log('Used squares on the disk:', countUsedSquares(input));
console.log('Groups on the disk:', countGroups(input));