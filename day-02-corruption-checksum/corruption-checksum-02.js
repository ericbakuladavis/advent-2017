const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n').map((line) => line.split('\t').map(parseInt));

let sum = 0;

input.forEach((line) => {
    for (let i = 0; i < line.length - 1; i++){
        let curNum = line[i];
        for (let j = i + 1; j < line.length; j++){
            let otherNum = line[j];    
            let sortedNums = [curNum, otherNum].sort((a,b) => b - a);
            if (sortedNums[0] % sortedNums[1] === 0){
                sum += sortedNums[0] / sortedNums[1];
                break;
            }
        }
    }
});

console.log(sum);