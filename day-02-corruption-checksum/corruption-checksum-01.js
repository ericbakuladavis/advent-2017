// // easy answer
// function getCheckSum(input){
//     return input.reduce((sum, line) => sum + Math.max(...line) - Math.min(...line),0);
// }

// more efficient answer?
function getCheckSum(input){
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

const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n').map((line) => line.split('\t').map((num) => parseInt(num)));

console.log(getCheckSum(input)); // 44670