function inverseCaptcha(input){
    let sum = 0;
    for (let i = 0; i < input.length / 2; i++){
        const curNum = input[i];
        const nextNumIndex = i + input.length / 2;
        const nextNum = input[nextNumIndex];

        if (curNum === nextNum)
            sum += curNum + nextNum;
    }
    return sum;
}

const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('').map((str) => parseInt(str));

console.log(inverseCaptcha(input)); // 1284