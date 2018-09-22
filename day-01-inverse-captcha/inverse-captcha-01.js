function inverseCaptcha(input){
    let sum = 0;
    for (let i = 0; i < input.length; i++){
        const curNum = input[i];
        let nextNum = input[i + 1];
    
        if (i === input.length - 1)
            nextNum = input[0];
    
        if (curNum === nextNum)
            sum += curNum;
    }
    return sum;
}

const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('').map((str) => parseInt(str));

console.log(inverseCaptcha(input)); // 1223