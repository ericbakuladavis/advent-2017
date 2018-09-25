function getCheckSum1(input){
    let sum = 0; 
    for (let i = 0; i < input.length; i++){
        const line = input[i];
        let max = line[0];
        let min = line[0];
        for (let j = 1; j < line.length; j++){
            const num = line[j];
            if (num > max)
                max = num;
            else if (num < min)
                min = num;
        }
        sum += max - min;
    }
    return sum;
}

function getChecksum2(input) {
    let sum = 0;
    input.forEach((line) => {
        for (let i = 0; i < line.length - 1; i++){
            const curNum = line[i];
            for (let j = i + 1; j < line.length; j++){
                const otherNum = line[j];    
                const sortedNums = [curNum, otherNum].sort((a,b) => b - a);
                const biggerNum = sortedNums[0];
                const smallerNum = sortedNums[1];
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
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n').map((line) => line.split('\t').map((num) => parseInt(num)));
console.log(getCheckSum1(input)); // 44670
console.log(getChecksum2(input)); // 285