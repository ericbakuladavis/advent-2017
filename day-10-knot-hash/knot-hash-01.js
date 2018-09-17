function applyTwists(list, input){
    list = list.slice();
    let currentPosition = 0;
    let skipSize = 0;
    let leftIndex;
    let rightIndex;

    input.forEach((length) => {
        let swapOpperations = Math.floor(length / 2);
        leftIndex = currentPosition;
        rightIndex = (leftIndex + length - 1) % list.length;
        for (let i = 0; i < swapOpperations; i++){
            leftNum = list[leftIndex];
            rightNum = list[rightIndex];
            list[leftIndex] = rightNum;
            list[rightIndex] = leftNum;
            leftIndex = (leftIndex + 1) % list.length;
            rightIndex = (rightIndex - 1 + list.length) % list.length;
       }
       currentPosition = (currentPosition + length + skipSize) % list.length;
       skipSize++;
    });
    return list;
}

function generateList(listLength){
    let list = [];
    for (let i = 0; i < listLength; i++){
        list.push(i);
    }
    return list;
}

function knotHash(input){
    let list = generateList(256);
    list = applyTwists(list, input);
    return list[0] * list[1];
}

const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split(',').map((num) => parseInt(num));

console.log(knotHash(input)); // 40132