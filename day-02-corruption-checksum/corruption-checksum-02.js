function getChecksum(input) {
    let sum = 0;
    input.forEach((line) => {
        for (let i = 0; i < line.length - 1; i++){
            let curNum = line[i];
            for (let j = i + 1; j < line.length; j++){
                let otherNum = line[j];    
                let sortedNums = [curNum, otherNum].sort((a,b) => b - a);
                let biggerNum = sortedNums[0];
                let smallerNum = sortedNums[1];
                if (biggerNum % smallerNum === 0){
                    sum += biggerNum / smallerNum;
                    break;
                }
            }
        }
    });
    return sum;
}

const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n').map((line) => line.split('\t').map((str) => parseInt(str)));

console.log(getChecksum(input)); // 285