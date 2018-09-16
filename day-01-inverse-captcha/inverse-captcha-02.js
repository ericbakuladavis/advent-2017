function inverseCaptcha(input){
    let sum = 0;
    for (let i = 0; i < input.length / 2; i++){
        let curNum = input[i];
        let nextNumIndex = i + input.length / 2;
        let nextNum = input[nextNumIndex];

        if (curNum === nextNum)
            sum += curNum + nextNum;
    }
    return sum;
}

const fs = require('fs');
let input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('').map((str) => parseInt(str));

console.log(inverseCaptcha(input)); // 1284